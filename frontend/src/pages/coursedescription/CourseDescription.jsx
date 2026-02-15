/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import './coursedescription.css';
import { useNavigate, useParams } from 'react-router-dom';
import { CourseData } from '../../context/CourseContext';
import { server } from '../../main';
import axios from 'axios';
import toast from 'react-hot-toast';
import { UserData } from '../../context/UserContext';
import Loading from '../../components/loading/Loading';
import logo from '../../assets/Image/Logo.png'


const CourseDescription = ({ user }) => {
  const params = useParams();
  const [loading, setLoading] = useState(false); // Now properly using both loading and setLoading
  const navigate = useNavigate(); 
  const { fetchUser } = UserData();
  const { fetchCourse, course, fetchCourses, fetchMyCourse } = CourseData();

  useEffect(() => {
    fetchCourse(params.id); // Fetch course based on course id
  }, []); // Added fetchCourse as a dependency

  const checkoutHandler = async () => {
    const token = localStorage.getItem("token");
    setLoading(true);
    try {
      const {
        data: { order },
      } = await axios.post(
        `${server}/api/course/checkout/${params.id}`,
        {},
        {
          headers: {
            token,
          },
        }
      );

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY || "rzp_test_OGrO4nQBmIy32X", // Use Vite env or fallback
        amount: order.id, // Amount is in currency subunits (paise)
        currency: "INR",
        name: "Guru Academy", // Business name
        description: "Learn with us",
        image:logo,// SLearn with usample image
        order_id: order.id, // Pass the order id obtained from the backend
        handler: async function (response) {
          const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
            response;
          try {
            const { data } = await axios.post(
              `${server}/api/verification/${params.id}`,
              {
                razorpay_order_id,
                razorpay_payment_id,
                razorpay_signature,
              },
              {
                headers: {
                  token,
                },
              }
            );

            await fetchUser(); // Refetch user details after successful payment
            await fetchCourses();
            await fetchMyCourse(); // Refetch courses after purchase
            toast.success(data.message); // Show success message
            setLoading(false);
            navigate(`/payment-success/${razorpay_payment_id}`); // Redirect to success page
          } catch (error) {
            toast.error(error.response.data.message); // Show error message
            setLoading(false);
          }
        },
        theme: {
          color: "#8a4baf", // Razorpay theme color
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      toast.error("Failed to initiate checkout."); // Show error message if checkout fails
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <Loading /> // Show loading spinner while loading
      ) : (
        <>
          {course && (
            <div className="course-description">
              <div className="course-header">
                <img
                  src={`${server}/${course.image}`}
                  alt={course.title}
                  className="course-image"
                />
                <div className="course-info">
                  <h2>{course.title}</h2>
                  <p>Instructor: {course.createdBy}</p>
                  <p>Duration: {course.duration} weeks</p>
                </div>
              </div>

              <p>{course.description}</p>

              <p>Let&apos;s get started with the course at ₹{course.price}</p>

              {user && user.subscription && user.subscription.includes(course._id) ? (
                <button
                  onClick={() => navigate(`/course/study/${course._id}`)}
                  className="common-btn"
                >
                  Study
                </button>
              ) : (
                <button onClick={checkoutHandler} className="common-btn">
                  Buy Now
                </button>
              )}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default CourseDescription;
