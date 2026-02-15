const fs = require('fs');
const path = require('path');

const SRC = path.join(__dirname, '..', 'src');
const exts = ['.jsx', '.js', '.ts', '.tsx', '.css', '.json', '.png', '.jpg', '.jpeg', '.svg', '.mp4', '.pdf'];

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(filePath));
    } else if (/\.(jsx|js|ts|tsx)$/.test(file)) {
      results.push(filePath);
    }
  });
  return results;
}

function resolveImport(importerFile, importPath) {
  const importerDir = path.dirname(importerFile);
  if (!importPath.startsWith('.')) return null; // not relative

  // Split query/hash
  const [rawPath] = importPath.split('?');
  const base = rawPath.replace(/#.*$/, '');

  const full = path.resolve(importerDir, base);

  // if exact file exists
  for (const ext of ['', '.jsx', '.js', '.ts', '.tsx', '.css', '.json', '.png', '.jpg', '.jpeg', '.svg', '.mp4', '.pdf']) {
    const candidate = full + ext;
    if (fs.existsSync(candidate)) return candidate;
  }

  // if directory with index
  if (fs.existsSync(full) && fs.statSync(full).isDirectory()) {
    for (const ext of ['.jsx', '.js', '.ts', '.tsx', '.json']) {
      const idx = path.join(full, 'index' + ext);
      if (fs.existsSync(idx)) return idx;
    }
  }

  return null;
}

function findExactPath(realPath) {
  // Walk up from realPath to SRC and reconstruct path with actual directory entry names
  const parts = path.relative(SRC, realPath).split(path.sep);
  let cur = SRC;
  const resolvedParts = [];
  for (const p of parts) {
    const entries = fs.readdirSync(cur);
    const match = entries.find(e => e === p) || entries.find(e => e.toLowerCase() === p.toLowerCase());
    if (!match) return null;
    resolvedParts.push(match);
    cur = path.join(cur, match);
  }
  return path.join(SRC, ...resolvedParts);
}

function fixFile(file) {
  let src = fs.readFileSync(file, 'utf8');
  const importRegex = /(import\s+[\s\S]*?from\s+|require\()(["'])(\.\.?(?:[^"']*))["']\)?/g;
  let m;
  let changed = false;
  const dir = path.dirname(file);
  let newSrc = src;
  while ((m = importRegex.exec(src)) !== null) {
    const [whole, pre, quote, rel] = m;
    const importPath = rel;
    const resolved = resolveImport(file, importPath);
    if (!resolved) continue;
    const exact = findExactPath(resolved);
    if (!exact) continue;
    // determine correct relative path from importer dir
    let relCorrect = path.relative(dir, exact).split(path.sep).join('/');
    if (!relCorrect.startsWith('.')) relCorrect = './' + relCorrect;
    const originalHasExt = /\.[a-zA-Z0-9]+$/.test(importPath);
    let finalRel = relCorrect;
    if (!originalHasExt) finalRel = finalRel.replace(/\.[^.\/]+$/, '');
    if (finalRel !== importPath) {
      const from = (pre || '') + quote + importPath + quote;
      const to = (pre || '') + quote + finalRel + quote;
      newSrc = newSrc.replace(from, to);
      changed = true;
      console.log(`Fixed in ${file}: '${importPath}' -> '${finalRel}'`);
    }
  }
  if (changed) fs.writeFileSync(file, newSrc, 'utf8');
}

function main() {
  const files = walk(SRC);
  console.log(`Scanning ${files.length} files...`);
  files.forEach(fixFile);
  console.log('Done');
}

main();
