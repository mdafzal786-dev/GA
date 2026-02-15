import React from "react";
import "./about.css";
import founderImage from "../../assets/Image/Afzal1.jpg";
import logo from "../../assets/Image/logo.png";

const About = () => {
    return (
        <div className="about-container">
            {/* Logo */}
              <div className="about-logo-wrapper">
    <img src={logo} alt="Guru Academy Logo" className="logo" />
</div>

            <h1>Lead By Example</h1>

            {/* Mission */}
            <h2 className="title">Our Mission</h2>
            <p className="mission">
                At Lead By Example, we empower individuals to reach their fullest potential through 
                personalized, high-quality online learning and mentorship. Our mission is to create a 
                supportive and engaging environment that encourages growth, resilience, confidence, 
                and success in both personal and professional life.
            </p>

            {/* Vision */}
            <h2 className="title">Our Vision</h2>
            <p className="vision">
                Our vision is to become a leading global platform that inspires people to transform 
                themselves, unlock hidden potential, and lead meaningful lives. We aim to build a 
                community where learning is accessible, impactful, and deeply connected with real-life 
                experiences.
            </p>

            {/* Founder */}
            <div className="founder-section">
                <div className="founder-info">
                    <h2>Meet Our Founder</h2>
                    <p>
                        Our founder, <strong>Afzal Khan</strong>, established Guru Academy with a vision 
                        to guide and support individuals in their personal and academic journey. With years 
                        of mentoring experience and a passion for creating impact, Afzal continues to inspire 
                        thousands through his leadership, discipline, and real-world insights.
                    </p>

                    <div className="social-media-icons">
                        <a href="https://www.facebook.com/GuruAfzal" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-facebook-f"></i>
                        </a>
                        <a href="https://www.twitter.com/GuruAfzal" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-twitter"></i>
                        </a>
                        <a href="https://www.linkedin.com/in/GuruAfzal" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-linkedin-in"></i>
                        </a>
                        <a href="https://www.instagram.com/guru_afzal0786" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-instagram"></i>
                        </a>
                    </div>
                </div>

                <img src={founderImage} alt="Founder" className="founder-image" />
            </div>

           {/* Team Section */}
<h2 className="title">Meet Our Team</h2>
<div className="team-section">

    {/* Team Member 1 */}
    <div className="team-card">
        <img src={founderImage} alt="Team Member" className="team-image" />
        <h3>Afzal Khan</h3>
        <p>Developer</p>

        <div className="team-social-icons">
            <a href="https://facebook.com/GuruAfzal" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://twitter.com/GuruAfzal" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-twitter"></i>
            </a>
            <a href="https://linkedin.com/in/GuruAfzal" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-linkedin-in"></i>
            </a>
            <a href="https://instagram.com/guru_afzal0786" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram"></i>
            </a>
        </div>
    </div>

    {/* Team Member 2 */}
    <div className="team-card">
        <img src={founderImage} alt="Team Member" className="team-image" />
        <h3>Aman</h3>
        <p>Academic Coordinator</p>

        <div className="team-social-icons">
            <a href="#">
                <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#">
                <i className="fab fa-twitter"></i>
            </a>
            <a href="#">
                <i className="fab fa-linkedin-in"></i>
            </a>
            <a href="#">
                <i className="fab fa-instagram"></i>
            </a>
        </div>
    </div>

    {/* Team Member 3 */}
    <div className="team-card">
        <img src={founderImage} alt="Team Member" className="team-image" />
        <h3>Shahnawaz</h3>
        <p>Content Creator</p>

        <div className="team-social-icons">
            <a href="#">
                <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#">
                <i className="fab fa-twitter"></i>
            </a>
            <a href="#">
                <i className="fab fa-linkedin-in"></i>
            </a>
            <a href="#">
                <i className="fab fa-instagram"></i>
            </a>
        </div>
    </div>

</div>

        </div>
    );
};

export default About;
