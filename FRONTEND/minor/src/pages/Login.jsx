
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext"; // ✅ Ensure correct import
import "./Login.css";
import axios from "axios";
import { toast } from "react-toastify";
import {
  FaFacebookF,
  FaGoogle,
  FaApple,
  FaEnvelope,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import Loginimg from "../assets/Loginimg.jpg";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [authState, setAuthState] = useState("Login"); 

  const { backendUrl, setIsLoggedin } = useContext(AppContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      axios.defaults.withCredentials = true;
      const { email, password } = formData;

      let url = backendUrl + "/api/auth/login";
      if (authState === "register") {
        url = backendUrl + "/api/auth/register";
      }

      const { data } = await axios.post(url, { email, password });

      if (data.success) {
        setIsLoggedin(true);
        navigate("/");
        toast.success(data.message || "Login successful!");
      } else {
        setError(data.message);
        toast.error(data.message);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Something went wrong. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form-container">
        <div className="login-form-box">
          <h1>Welcome Back</h1>
          <h2>{authState} to InsideBox</h2>

          {error && <div className="login-error">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="login-input-group">
              <label htmlFor="email">E-mail</label>
              <div className="login-input-wrapper">
                <FaEnvelope className="login-icon" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="example@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="login-input-group">
              <label htmlFor="password">Password</label>
              <div className="login-input-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="********"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                {showPassword ? (
                  <FaEyeSlash
                    className="login-icon login-eye-icon"
                    onClick={togglePasswordVisibility}
                  />
                ) : (
                  <FaEye
                    className="login-icon login-eye-icon"
                    onClick={togglePasswordVisibility}
                  />
                )}
              </div>
            </div>

            <button type="submit" className="login-btn">
              {authState}
            </button>
          </form>

          {/* Social Login */}
          <div className="login-social-icons">
            <button className="login-social-btn login-fb">
              <FaFacebookF />
            </button>
            <button className="login-social-btn login-google">
              <FaGoogle />
            </button>
            <button className="login-social-btn login-apple">
              <FaApple />
            </button>
          </div>

          <p className="login-text-center">
          already have an account,
            <a
              className="register-link"
              style={{ cursor: 'pointer' }}
              onClick={() => navigate('/register')}
            >
              register
            </a>
          </p>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="login-image-container">
        <img src={Loginimg} alt="Login" className="login-image" />
      </div>
    </div>
  );
};

export default Login;
