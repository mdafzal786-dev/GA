import React from "react";
import "./results.css";

// RSC / CBSE banner image
import rscImage from "../../assets/Image/Logo.png";

const ResultPage = () => {
  return (
    <div className="result-container">

      {/* Banner Image */}
      <div className="banner-box">
        <img 
          src={rscImage} 
          alt="CBSE Result Banner"
          className="banner-img"
        />
      </div>

      {/* Title */}
      <h1 className="title">📘 CBSE Exam Result Portal</h1>

      {/* Description */}
      <p className="info-text">
        Access your official CBSE results quickly and securely —{" "}
        <a 
          href="https://results.biharboardonline.com/" 
          target="_blank" 
          rel="noreferrer" 
          className="inline-link"
        >
          Click here to check now
        </a>
      </p>

      {/* Highlight cards */}
      <div className="highlight-box">
        <p>✔ Class 10 (Matric) & Class 12 (Intermediate)</p>
        <p>✔ Check results using Roll Code & Roll Number</p>
        <p>✔ Official CBSE Results Portal</p>
        <p>✔ Fast, secure, and mobile-friendly</p>
      </div>

      {/* Buttons */}
      <div className="button-section">
        <a 
          href="https://results.biharboardonline.com/" 
          target="_blank" 
          rel="noreferrer"
          className="result-btn"
        >
          🔍 Check Class 10 Result
        </a>

        <a 
          href="https://results.biharboardonline.com/" 
          target="_blank" 
          rel="noreferrer"
          className="result-btn"
        >
          📊 Check Class 12 Result
        </a>
      </div>

      {/* Footer Note */}
      <p className="footer-note">
        ⚠️ Results are published officially by CBSE.  
        Ensure all details entered are correct.
      </p>

    </div>
  );
};

export default ResultPage;
