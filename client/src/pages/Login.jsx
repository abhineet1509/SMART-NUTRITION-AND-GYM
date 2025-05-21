
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext"; 
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

  const { backendUrl, setIsLoggedin , setUserName } = useContext(AppContext);

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
        setUserName(data.user.name);
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
    <div className="min-h-screen bg-white flex flex-col lg:flex-row overflow-y-auto">
    {/* Form container */}
    <div className="flex-1 flex justify-center items-start lg:items-center p-6 lg:p-10 w-full">
      <div className="w-[90%] max-w-md bg-white p-6 sm:p-8 md:p-10 rounded-xl text-center mt-10 mb-10">
        <h1 className="font-light text-lg mb-1">Welcome Back</h1>
        <h2 className="font-semibold text-3xl mb-5">{authState} to InsideBox</h2>
  
        {error && <div className="text-red-500 mb-4">{error}</div>}
  
        <form onSubmit={handleSubmit}>
          {/* Email input */}
          <div className="mb-5 text-left">
            <label htmlFor="email" className="font-medium block mb-1">E-mail</label>
            <div className="flex items-center bg-gray-200 rounded-full px-4 py-2">
              <FaEnvelope className="text-gray-500 mr-3" />
              <input
                type="email"
                id="email"
                name="email"
                placeholder="example@email.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="bg-transparent w-full outline-none text-sm h-8"
              />
            </div>
          </div>
  
          {/* Password input */}
          <div className="mb-5 text-left">
            <label htmlFor="password" className="font-medium block mb-1">Password</label>
            <div className="flex items-center bg-gray-200 rounded-full px-4 py-2">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="********"
                value={formData.password}
                onChange={handleChange}
                required
                className="bg-transparent w-full outline-none text-sm h-8"
              />
              {showPassword ? (
                <FaEyeSlash
                  className="text-gray-500 cursor-pointer ml-auto transition-colors duration-300 hover:text-blue-600"
                  onClick={togglePasswordVisibility}
                />
              ) : (
                <FaEye
                  className="text-gray-500 cursor-pointer ml-auto transition-colors duration-300 hover:text-blue-600"
                  onClick={togglePasswordVisibility}
                />
              )}
            </div>
          </div>
  
          <div
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-800 text-white text-lg font-medium py-2 rounded-full mb-8 transition duration-300"
          >
            {authState}
          </div>
        </form>
  
        {/* Social login */}
        <div className="flex justify-center gap-4 mt-4 mb-5 text-gray-600 text-sm">
          <div className="bg-blue-800 text-white w-12 h-12 rounded-full flex items-center justify-center hover:opacity-80 transition duration-300">
            <FaFacebookF />
          </div>
          <div className="bg-red-600 text-white w-12 h-12 rounded-full flex items-center justify-center hover:opacity-80 transition duration-300">
            <FaGoogle />
          </div>
          <div className="bg-black text-white w-12 h-12 rounded-full flex items-center justify-center hover:opacity-80 transition duration-300">
            <FaApple />
          </div>
        </div>
  
        <p className="text-sm mt-4">
          already have an account,{' '}
          <span
            className="text-blue-600 font-medium cursor-pointer hover:underline"
            onClick={() => navigate('/register')}
          >
            register
          </span>
        </p>
      </div>
    </div>
  
    {/* Image container - hidden on mobile and tab */}
    <div className="hidden lg:flex flex-1 justify-center items-center">
      <img src={Loginimg} alt="Login" className="w-11/12 max-w-lg rounded-xl" />
    </div>
  </div>
  
  
  );
};

export default Login;
