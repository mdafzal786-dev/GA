import { useState } from "react";
import "./auth.css";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { server } from "../../main";
import logo from '../../assets/Image/Logo.png'

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBtnLoading(true);
    try {
      const { data } = await axios.post(`${server}/api/user/forgot`, { email });

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
        <p className="welcome-text">Enter your registered email</p>
        <h2>Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="text">Enter Email</label>
          <input
            type="email"
            value={email}
            placeholder="example@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button disabled={btnLoading} className="common-btn">
            {btnLoading ? "Please Wait..." : "Send Reset Link"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
