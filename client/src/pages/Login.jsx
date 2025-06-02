import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { FaGoogle, FaEnvelope, FaEye, FaEyeSlash } from "react-icons/fa";
import Loginimg from "../assets/Loginimg.jpg";
import {
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";
import { auth } from "../firebase/FirebaseConfig.js";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [authState] = useState("Login");

  const { backendUrl, setIsLoggedin, setUserName } = useContext(AppContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      axios.defaults.withCredentials = true;
      const { email, password } = formData;

      const url = `${backendUrl}/api/auth/login`;

      const { data } = await axios.post(url, { email, password });

      if (data.success) {
        setIsLoggedin(true);
        setUserName(data.user.name);
        toast.success(data.message || "Login successful!");
        navigate("/");
      } else {
        setError(data.message);
        toast.error(data.message);
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        "Something went wrong. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  const handleGoogle = async (e) => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("Google Sign-In Successful:", user);
      toast.success(`Welcome, ${user.displayName || "User"}!`);
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      toast.error("Google Sign-In failed. Please try again.");
    }
  };
  return (
    <div className="min-h-screen bg-white flex flex-col lg:flex-row overflow-y-auto">
      {/* Form container */}
      <div className="flex-1 flex justify-center items-start lg:items-center p-6 lg:p-10 w-full">
        <div className="w-[90%] max-w-md bg-white p-6 sm:p-8 md:p-10 rounded-xl text-center mt-10 mb-10">
          <h1 className="font-light text-lg mb-1">Welcome Back</h1>
          <h2 className="font-semibold text-3xl mb-5">
            {authState} to FitWork
          </h2>

          {error && <div className="text-red-500 mb-4">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-5 text-left">
              <label htmlFor="email" className="font-medium block mb-1">
                E-mail
              </label>
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

            <div className="mb-5 text-left">
              <label htmlFor="password" className="font-medium block mb-1">
                Password
              </label>
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

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-800 text-white text-lg font-medium py-2 rounded-full mb-8 transition duration-300 rounded"
            >
              {authState}
            </button>
          </form>

          <div className="flex items-center justify-center mt-4">
            <button
              onClick={handleGoogle}
              className="flex items-center gap-3 border border-gray-300 bg-white px-5 py-2 rounded-md shadow-sm hover:shadow-md transition duration-200 rounded"
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="w-5 h-5 mr-3"
              />
              <span className="text-sm text-gray-800 font-medium">
                Sign in with Google
              </span>
            </button>
          </div>

          <p className="text-sm mt-4">
            Don’t have an account?{" "}
            <span
              className="text-blue-600 font-medium cursor-pointer hover:underline"
              onClick={() => navigate("/register")}
            >
              Register
            </span>
          </p>
        </div>
      </div>

      {/* Image container - hidden on mobile and tablet */}
      <div className="hidden lg:flex flex-1 justify-center items-center">
        <img
          src={Loginimg}
          alt="Login"
          className="w-11/12 max-w-lg rounded-xl"
        />
      </div>
    </div>
  );
};

export default Login;
