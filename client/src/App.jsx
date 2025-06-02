import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import NavBar from "./Components/NavBar";
import Footer from "./Components/Footer";
import ChatBot from "./Components/Chatbot";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Contact from "./pages/Contact";
import Packages from "./Components/Packages";
import Pricing from "./pages/Pricing";
import Explore from "./pages/Explore";
import Error from "./pages/Error";
import { HashLoader } from "react-spinners";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <ToastContainer />
      {loading ? (
        <div className="flex items-center justify-center h-screen">
          <HashLoader loading={true} size={80} color="#171718" />
        </div>
      ) : (
        <AppContent />
      )}
    </>
  );
};

// Layout component to conditionally render NavBar and Footer
const Layout = ({ children }) => {
  const location = useLocation();
  const hidePaths = ["/register", "/login", "/contact", "/pricing", "/explore", "/error"];
  const hideNavAndFooter = hidePaths.includes(location.pathname.toLowerCase());

  return (
    <>
      {!hideNavAndFooter && <NavBar />}
      <main>{children}</main>
      {!hideNavAndFooter && <Footer />}
    </>
  );
};

const AppContent = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<><Home /><Packages /></>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="*" element={<Error />} />
      </Routes>

      <ChatBot />
    </Layout>
  );
};

export default App;
