import { Link } from "react-router-dom";
import "./notes.css";

import class9Img from "../../assets/Image/Logo.png";

const NotePage = () => {
  const classes = [
    { title: "CLASS 9", subtitle: "Notes, MCQ, Test", link: "https://www.starzannotes.in/", external: true, img: class9Img },
    { title: "CLASS 10", subtitle: "Notes, MCQ, Test", link: "https://www.starzannotes.in/", external: true, img: class9Img },
    { title: "CLASS 11", subtitle: "Notes, MCQ, Test", link: "https://www.starzannotes.in/", external: true, img: class9Img },
    { title: "CLASS 12", subtitle: "Notes, MCQ, Test", link: "https://www.starzannotes.in/", external: true, img: class9Img },
  ];

  return (
    <div className="note-container">
      <h1 className="title">📝 My Notes + Ebook</h1>

      <div className="grid-container">
        {classes.map((item, index) =>
          item.external ? (
            <a
              href={item.link}
              target="_blank"
              rel="noreferrer"
              className="grid-card"
              key={index}
            >
              <img src={item.img} alt={item.title} className="class-img" />
              <h2>{item.title}</h2>
              <p>{item.subtitle}</p>
            </a>
          ) : (
            <Link to={item.link} className="grid-card" key={index}>
              <img src={item.img} alt={item.title} className="class-img" />
              <h2>{item.title}</h2>
              <p>{item.subtitle}</p>
            </Link>
          )
        )}
      </div>
    </div>
  );
};

export default NotePage;
