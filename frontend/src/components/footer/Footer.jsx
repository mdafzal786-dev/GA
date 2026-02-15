import React from "react";
import {
  FaFacebook,
  FaTwitter,
  FaInstagramSquare,
  FaYoutube,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        {/* Courses + Address */}
        <div className="footer-section courses-address">
          <h3>Courses</h3>
          <ul>
            <li>MERN STACK Training</li>
            <li>QA Training</li>
            <li className="highlight">Data Analytics Training</li>
            <li>Selenium Training</li>
          </ul>

          <h3>
            <FaMapMarkerAlt /> Address
          </h3>
          <p>G2 First Floor,Chhaurahi, Dalokhar, Babubarhi, Madhubani</p>

          {/* Google Map Embed */}
          <div className="map-container">
            <iframe
              title="Our Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3589.8318438316493!2d86.1520898753538!3d26.56434367687756!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ec12c56a88f7d7%3A0x33c57bb6d1d7a5a7!2sBabubarhi%2C%20Bihar%20847015!5e0!3m2!1sen!2sin!4v1714226405632!5m2!1sen!2sin"
              width="100%"
              height="250"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        {/* Call Us + Menu */}
        <div className="footer-section call-menu">
          <h3>
            <FaPhoneAlt /> Call Us
          </h3>
          <p>
            <strong>Co-Founder & CEO:</strong>
            <a href="tel:+7260023491" className="phone-link">
              7260023491
            </a>
          </p>

          <h3>Menu</h3>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/notes">EBook</a>
            </li>
            <li>
              <a href="/courses">Courses</a>
            </li>
            <li>
              <a href="/about">About Us</a>
            </li>
          </ul>
        </div>

        {/* Mail Us + Subscribe */}
        <div className="footer-section mail-subscribe">
          <h3>
            <FaEnvelope /> Mail Us
          </h3>
          <p>
            <a href="mailto:guruacedemy786@gmail.com">
              guruacedemy786@gmail.com
            </a>
          </p>

          <h3>
            <FaYoutube /> Subscribe Us
          </h3>
          <p>
            <a
              href="https://www.youtube.com/@Tech_guru_afzal"
              target="_blank"
              rel="noopener noreferrer"
            >
              Youtube.com/@Tech_guru_afzal
            </a>
          </p>
        </div>
      </div>

      <div className="footer-social">
        <p>
          &copy; 2025 Your Guru Academy. All rights reserved.
          <br />
          Made with ❤️ By
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
          >
            Er. Afzal
          </a>
        </p>

        <div className="social-links">
          <a
            target="_blank"
            href="https://www.facebook.com/share/1AU4u74dAm/"
            className="social-icon"
          >
            <FaFacebook />
          </a>
          <a
            target="_blank"
            href="https://x.com/AfzalKhan149343"
            className="social-icon"
          >
            <FaTwitter />
          </a>
          <a
            target="_blank"
            href="https://www.instagram.com/guru_afzal0786"
            className="social-icon"
          >
            <FaInstagramSquare />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
