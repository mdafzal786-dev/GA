/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { MdDashboard } from "react-icons/md";
import "./account.css";
import { IoMdLogOut } from "react-icons/io";
import { UserData } from "../../context/UserContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

// Array of image URLs (replace with actual URLs or placeholders)
const randomImages = [
  "https://randomuser.me/api/portraits/men/1.jpg",
  "https://randomuser.me/api/portraits/men/2.jpg",
  "https://randomuser.me/api/portraits/men/3.jpg",
  "https://randomuser.me/api/portraits/men/4.jpg",
  "https://randomuser.me/api/portraits/women/1.jpg",
  "https://randomuser.me/api/portraits/women/2.jpg",
  "https://randomuser.me/api/portraits/women/3.jpg"
];

const Account = ({ user }) => {
  const { setIsAuth, setUser } = UserData();
  const navigate = useNavigate();

  // Get the image from localStorage or set to default image if not found
  const [image, setImage] = useState(localStorage.getItem("userImage") || randomImages[Math.floor(Math.random() * randomImages.length)]);

  // State to toggle edit mode
  const [isEditMode, setIsEditMode] = useState(false);

  // User data state for profile updates
  const [profileData, setProfileData] = useState({
    name: user.name,
    email: user.email,
  });

  // Effect to ensure the image persists after logout/login
  useEffect(() => {
    const savedImage = localStorage.getItem("userImage");
    if (savedImage) {
      setImage(savedImage); // If an image is found in localStorage, use it
    }
  }, []);

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result; // Get the base64 image URL
        setImage(imageUrl); // Update the image state with the new image
        localStorage.setItem("userImage", imageUrl); // Save the image to localStorage
      };
      reader.readAsDataURL(file); // Convert the image to base64
    }
  };

  // Logout handler
  const logoutHandler = () => {
    localStorage.removeItem("userImage"); // Remove the image from localStorage
    setUser([]);          // Clear user state
    setIsAuth(false);     // Set authentication status to false
    toast.success("Logged Out");
    navigate("/login");   // Redirect to login page
  };

  // Handle editing profile data
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Save profile updates (for example, updating localStorage or backend API)
  const handleSaveProfile = () => {
    // Save the updated profile data to localStorage or send it to a backend
    localStorage.setItem("userProfile", JSON.stringify(profileData));
    toast.success("Profile Updated!");
    setIsEditMode(false);
  };

  return (
    <div>
      {user && (
        <div className="profile">
          <h2>My Profile</h2>

          {/* Display User Image */}
          <div className="profile-image">
            <img
              src={image} // Display the current profile image
              alt="User Profile"
              className="user-image"
            />
          </div>

          {/* Image Upload Button */}
          <div className="image-upload">
            <label htmlFor="file-input" className="upload-label">
              Edit Image
            </label>
            <input
              type="file"
              id="file-input"
              className="file-input"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>

          {/* Profile Edit Form */}
          <div className="profile-info">
            {/* Edit Mode: Allow fields to be updated */}
            <div>
              <label>Name: </label>
              {isEditMode ? (
                <input
                  type="text"
                  name="name"
                  value={profileData.name}
                  onChange={handleInputChange}
                />
              ) : (
                <strong>{profileData.name}</strong>
              )}
            </div>

            <div>
              <label>Email: </label>
              {isEditMode ? (
                <input
                  type="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleInputChange}
                />
              ) : (
                <strong>{profileData.email}</strong>
              )}
            </div>

            <button
              onClick={() => navigate(`/${user._id}/dashboard`)}
              className="common-btn"
            >
              <MdDashboard />
              Dashboard
            </button>

            <br />

            {user.role === "admin" && (
              <button
                onClick={() => navigate(`/admin/dashboard`)}
                className="common-btn"
              >
                <MdDashboard />
                Admin Dashboard
              </button>
            )}

            <br />

            {/* Toggle Edit Mode */}
            <button
              onClick={() => setIsEditMode((prev) => !prev)}
              className="common-btn"
            >
              {isEditMode ? "Cancel" : "Edit Profile"}
            </button>

            {isEditMode && (
              <button
                onClick={handleSaveProfile}
                className="common-btn"
                style={{ background: "green" }}
              >
                Save Profile
              </button>
            )}

            <br />

            <button
              onClick={logoutHandler}
              className="common-btn"
              style={{ background: "red" }}
            >
              <IoMdLogOut />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Account;
