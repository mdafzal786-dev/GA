import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaBook,
  FaFileAlt,
  FaGraduationCap,
  FaClipboardList,
  FaHome,
  FaInfoCircle,
} from "react-icons/fa";
import { FaMoon, FaSun } from "react-icons/fa";  // 🌙☀️ ICONS
import "./header.css";
import logo from "../../assets/Image/Logo.png";

const Header = ({ isAuth }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [hideHeader, setHideHeader] = useState(false);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    setActiveDropdown(null);
  };

  const toggleDropdown = (dropdownName) => {
    setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
  };

  const handleLoginClick = () => {
    setHideHeader(true);
    setTimeout(() => navigate("/login"), 300);
  };

  return (
    <header className={`header ${hideHeader ? "header-hide" : ""}`}>
      <div className="logo" onClick={() => navigate("/")}>
        <img src={logo} alt="Lead By Example Logo" className="logo-img" />
      </div>

      {/* 🌙 Dark Mode Toggle Button */}
      <div className="dark-toggle" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? <FaSun size={22} /> : <FaMoon size={22} />}
      </div>

      <div className="hamburger" onClick={toggleMenu}>
        {menuOpen ? <FaTimes size={30} /> : <FaBars size={30} />}
      </div>

      <div className={`links ${menuOpen ? "nav-active" : ""}`}>
        <Link to="/" onClick={toggleMenu}>
          <span className="desktop-link">Home</span>
          <FaHome className="mobile-icon" />
        </Link>

        <Link to="/courses" onClick={toggleMenu}>
          <span className="desktop-link">Courses</span>
          <FaBook className="mobile-icon" />
        </Link>

        <Link to="/notes" onClick={toggleMenu}>
          <span className="desktop-link">Ebook</span>
          <FaFileAlt className="mobile-icon" />
        </Link>

        {/* NCERT dropdown */}
        <div className="dropdown">
          <button className="dropbtn" onClick={() => toggleDropdown("ncert")}>
            <span className="desktop-link">NCERT SOLUTION</span>
            <FaGraduationCap className="mobile-icon" />
          </button>
          <div
            className={`dropdown-content ${
              activeDropdown === "ncert" ? "show" : ""
            }`}
          >
            <Link to="/solutions/class-9" onClick={toggleMenu}>Class 9</Link>
            <Link to="/solutions/class-10" onClick={toggleMenu}>Class 10</Link>
            <Link to="/solutions/class-11" onClick={toggleMenu}>Class 11</Link>
            <Link to="/solutions/class-12" onClick={toggleMenu}>Class 12</Link>
          </div>
        </div>

        {/* RESULTS dropdown */}
        <div className="dropdown">
          <button className="dropbtn" onClick={() => toggleDropdown("result")}>
            <span className="desktop-link">Results</span>
            <FaClipboardList className="mobile-icon" />
          </button>
          <div
            className={`dropdown-content ${
              activeDropdown === "result" ? "show" : ""
            }`}
          >
            <Link to="/result/bbse" onClick={toggleMenu}>Bihar Board</Link>
            <Link to="/result/cbse" onClick={toggleMenu}>CBSE</Link>
          </div>
        </div>

        <Link to="/about" onClick={toggleMenu}>
          <span className="desktop-link">About</span>
          <FaInfoCircle className="mobile-icon" />
        </Link>
      </div>

      {isAuth ? (
        <Link to="/account" className="login-button" onClick={toggleMenu}>
          Account
        </Link>
      ) : (
        <button className="login-button" onClick={handleLoginClick}>
          Login
        </button>
      )}
    </header>
  );
};

export default Header;
