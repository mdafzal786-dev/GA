import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./home.css";

import { useNavigate } from "react-router-dom";
import { useEffect, useState, lazy, Suspense } from "react";
import Slider from "react-slick";

import Testimonials from "../../components/testimonials/Testimonials";
import About from "../about/About";
import Courses from "../courses/courses";

// Lazy load chatbot (performance boost)
const Chatbot = lazy(() => import("../../components/Chatbot/Chatbot"));

import Slide1 from "../../assets/Image/slider1_Video.mp4";
import Slide2 from "../../assets/Image/slide2.jpg";
import Slide3 from "../../assets/Image/slide3.jpg";
import Slide4 from "../../assets/Image/Guru1_video.mp4";

const Home = () => {
  const navigate = useNavigate();
  const [showButton, setShowButton] = useState(false);

  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    arrows: true,
    pauseOnHover: false,
  };

  // Show scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="home-page">
      {/* 🔹 Slider Section */}
      <div className="home">
        <Slider {...settings} className="slider">
          <div>
            <video
              className="slide-image"
              src={Slide1}
              autoPlay
              muted
              loop
              playsInline
            />
          </div>

          <div>
            <video
              className="slide-image"
              src={Slide4}
              autoPlay
              muted
              loop
              playsInline
            />
          </div>

          <div>
            <img src={Slide2} alt="Slide 2" className="slide-image" />
          </div>

          <div>
            <img src={Slide3} alt="Slide 3" className="slide-image" />
          </div>
        </Slider>

        {/* 🔹 Hero Content */}
        <div className="home-content">
          <h1>Hello Students 👋 Welcome to Lead By Example</h1>
          <p>Learn smart, grow fast, and succeed 🚀</p>
          <button
            onClick={() => navigate("/courses")}
            className="common-btn"
          >
            Get Started
          </button>
        </div>
      </div>

      {/* 🔹 Sections */}
      <Courses />
      <Testimonials />
      <About />

      {/* 🔹 Floating Chatbot */}
      <Suspense fallback={null}>
        <Chatbot />
      </Suspense>

      {/* 🔹 Scroll To Top */}
      {showButton && (
        <button className="scroll-top" onClick={scrollToTop}>
          ↑
        </button>
      )}
    </div>
  );
};

export default Home;
