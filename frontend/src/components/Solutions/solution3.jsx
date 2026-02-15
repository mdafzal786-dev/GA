/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "./solution.css";

import chapterPdf from "./Afzal_Resume.pdf";

const Solution1 = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const data = [
    {
      unit: "Unit 1: Real Numbers",
      chapters: [
        { title: "Chapter 2: Polynomials", link: chapterPdf },
        { title: "Chapter 3: Linear Equations", link: chapterPdf },
        { title: "Chapter 4: Quadratic Equations", link: chapterPdf },
        { title: "Chapter 5: Arithmetic Progressions", link: chapterPdf },
      ],
    },
    {
      unit: "Unit 2: Algebra",
      chapters: [
        { title: "Chapter 2: Polynomials", link: chapterPdf },
        { title: "Chapter 3: Linear Equations", link: chapterPdf },
        { title: "Chapter 4: Quadratic Equations", link: chapterPdf },
        { title: "Chapter 5: Arithmetic Progressions", link: chapterPdf },
      ],
    },
    {
      unit: "Unit 3: Coordinate Geometry",
      chapters: [
        { title: "Chapter 2: Polynomials", link: chapterPdf },
        { title: "Chapter 3: Linear Equations", link: chapterPdf },
        { title: "Chapter 4: Quadratic Equations", link: chapterPdf },
        { title: "Chapter 5: Arithmetic Progressions", link: chapterPdf },
      ],
    },
    {
      unit: "Unit 4: Geometry",
      chapters: [
        { title: "Chapter 7: Triangles", link: chapterPdf },
        { title: "Chapter 8: Circles", link: chapterPdf },
        { title: "Chapter 9: Constructions", link: chapterPdf },
      ],
    },
    {
      unit: "Unit 5: Geometry",
      chapters: [
        { title: "Chapter 7: Triangles", link: chapterPdf },
        { title: "Chapter 8: Circles", link: chapterPdf },
        { title: "Chapter 9: Constructions", link: chapterPdf },
      ],
    },
    {
      unit: "Unit 6: Geometry",
      chapters: [
        { title: "Chapter 7: Triangles", link: chapterPdf },
        { title: "Chapter 8: Circles", link: chapterPdf },
        { title: "Chapter 9: Constructions", link: chapterPdf },
      ],
    },
    {
      unit: "Unit 7: Geometry",
      chapters: [
        { title: "Chapter 7: Triangles", link: chapterPdf },
        { title: "Chapter 8: Circles", link: chapterPdf },
        { title: "Chapter 9: Constructions", link: chapterPdf },
      ],
    },
    {
      unit: "Unit 8: Geometry",
      chapters: [
        { title: "Chapter 7: Triangles", link: chapterPdf },
        { title: "Chapter 8: Circles", link: chapterPdf },
        { title: "Chapter 9: Constructions", link: chapterPdf },
      ],
    },
    {
      unit: "Unit 9: Geometry",
      chapters: [
        { title: "Chapter 7: Triangles", link: chapterPdf },
        { title: "Chapter 8: Circles", link: chapterPdf },
        { title: "Chapter 9: Constructions", link: chapterPdf },
      ],
    },
    {
      unit: "Unit 10: Geometry",
      chapters: [
        { title: "Chapter 7: Triangles", link: chapterPdf },
        { title: "Chapter 8: Circles", link: chapterPdf },
        { title: "Chapter 9: Constructions", link: chapterPdf },
      ],
    },
    {
      unit: "Unit 11: Geometry",
      chapters: [
        { title: "Chapter 7: Triangles", link: chapterPdf },
        { title: "Chapter 8: Circles", link: chapterPdf },
        { title: "Chapter 9: Constructions", link: chapterPdf },
      ],
    },
    {
      unit: "Unit 12: Geometry",
      chapters: [
        { title: "Chapter 7: Triangles", link: chapterPdf },
        { title: "Chapter 8: Circles", link: chapterPdf },
        { title: "Chapter 9: Constructions", link: chapterPdf },
      ],
    },
  ];

  const toggleUnit = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="solution-container">
      <h1 className="title">Bihar Board Class 11 — Solutions</h1>
      <p className="subtitle">Click on any unit to view chapters.</p>

      <div className="unit-grid">
        {data.map((unit, index) => (
          <div key={index} className="unit-card">
            <div className="unit-header" onClick={() => toggleUnit(index)}>
              <h2 className="unit-title">{unit.unit}</h2>
              <span className="arrow">{openIndex === index ? "▲" : "▼"}</span>
            </div>

            {openIndex === index && (
              <ul className="chapter-list">
                {unit.chapters.map((chapter, i) => (
                  <li key={i} className="chapter-item chapter-row">
                    <span className="chapter-name">{chapter.title}</span>

                    <div className="chapter-actions">
                      <a
                        href={chapter.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="view-btn"
                      >
                        View
                      </a>

                      <a href={chapter.link} download className="download-btn">
                        Download
                      </a>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Solution1;
