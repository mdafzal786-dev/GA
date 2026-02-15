import React, { useState } from "react";
import "./auth.css";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { server } from "../../main";
import logo from '../../assets/Image/logo.png'

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);
  const navigate = useNavigate();
  const { token } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBtnLoading(true);

    try {
      const { data } = await axios.post(
        `${server}/api/user/reset?token=${token}`,
        { password }
      );

      toast.success(data.message);
      setBtnLoading(false);
      navigate("/login");

    } catch (error) {
      toast.error(error.response?.data?.message || "Error occurred");
      setBtnLoading(false);
    }
  };
  return (
    <div className="auth-page">
      <div className="auth-form">
        <img src={logo} alt="Academy Logo" className="auth-logo" />
        <h2>Continue to use Guru Academy</h2>
        <p className="welcome-text">Enter your new password</p>
        <h2>Reset Password</h2>

        <form onSubmit={handleSubmit}>
          <label htmlFor="text">New Password</label>
          <input
            type="password"
            value={password}
            placeholder="Enter new password..."
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button disabled={btnLoading} className="common-btn">
            {btnLoading ? "Please Wait..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
