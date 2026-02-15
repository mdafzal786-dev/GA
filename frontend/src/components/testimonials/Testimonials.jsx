import React from 'react'
import "./Testimonials.css"
import Afzal1 from '../../assets/Image/Afzal1.jpg';

const Testimonials = () => {
    
const testimonialsData = [
    {
      id: 1,
      name: "Md Afzal",
      position: "Student",
      message:
        "Hey I am Eng Afzal, At Guru Academy, we empower students to unlock their full potential, providing personalized guidance and unwavering support on their journey to academic excellence and personal growth.",
      image:
      Afzal1,
    },
    {
      id: 2,
      name: "Aman",
      position: "Student",
      message:
        "Hey I am Aman,Guru Academy is dedicated to nurturing talent and fostering a love for learning, equipping students with the skills and confidence they need to succeed in their academic and personal pursuits.",
      image:
      Afzal1,
    },
    {
      id: 3,
      name: "Sahanwaz",
      position: "Student",
      message:
        "Hey I am Sahanwaz, At Guru Academy, we empower students to unlock their full potential, providing personalized guidance and unwavering support on their journey to academic excellence and personal growth.",
      image:
      Afzal1,
    },
   
  ];
  return (
    <section className="testimonials">
        <h2>Hear from Our Students</h2>
        <div className="testimonials-cards">
            {
                testimonialsData.map((e)=>(
                    <div className="testimonial-card" key={e.id}>
                        <div className="student-image">
                            <img src={e.image} alt=""/>
                        </div>
                        <p className="message">{e.message}</p>
                        <div className="info">
                            <p className="name">{e.name}</p>
                            <p className="position">{e.position}</p>
                        </div>
                    </div>
                ))
            }
            
        </div>
    </section>

    
    
  )
}

export default Testimonials

