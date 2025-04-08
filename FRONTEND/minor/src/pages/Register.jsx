import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import registerImage from "../assets/Loginimg.jpg";
import "./Register.css";



const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");  // Added state for confirm password

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      toast.error("❌ All fields are required!");
      return;
    }

    if (password.length < 6) {
      toast.error("❌ Password must be at least 6 characters!");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("❌ Passwords do not match!");
      return;
    }

    try {
      console.log("📤 Sending:", { name, email, password });

      const response = await fetch("http://localhost:4000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),  // Send only the password
      });

      const data = await response.json();
      console.log("📥 Server Response:", data);

      if (response.ok) {
        toast.success(" Registration successful!");
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");  // Clear the confirm password field
      } else {
        toast.error(data.error || " Registration failed");
      }
    } catch (error) {
      toast.error("❌ Server error! Try again later.");
    }
  };

  return (
    <div className="register-page-container">
      <div className="register-page-image-container">
        <img src={registerImage} alt="Register" className="register-page-image" />
      </div>

      <div className="register-page-form-container">
        <div className="register-page-form-box">
          <h2 className="register-page-title">Create an Account</h2>
          <form onSubmit={handleSubmit}>
            <div className="register-page-input-group">
              <label>Name</label>
              <input
                type="text"
                placeholder="Enter Name"
                autoComplete="off"
                className="register-page-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="register-page-input-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="Enter Email"
                autoComplete="off"
                className="register-page-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="register-page-input-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter Password"
                className="register-page-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="register-page-input-group">
              <label>Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm Password"
                className="register-page-input"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="register-page-button">
              Sign Up
            </button>
          </form>

          <p className="register-page-text">
            Already have an account?
            <Link to="/login" className="register-page-link"> Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
