import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom"; 
import NavBar from "./Components/NavBar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Contact from "./pages/Contact";
import Packages from "./Components/Packages";
import Footer from "./Components/Footer";
import { HashLoader } from "react-spinners";
import Gyming from "./Components/Gyming";
import NotFound from "./pages/NotFound";
import Pricing from "./pages/Pricing";
import Payment from "./pages/Payment";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Explore from "./pages/Explore";
const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <ToastContainer /> {/* ✅ Placed properly */}
      {loading ? (
        <div className="loader-container">
          <HashLoader loading={true} size={80} color={"#171718"} />
        </div>
      ) : (
        <AppContent />
      )}
    </>
  );
};

const AppContent = () => {
  const location = useLocation();

  const hideNavAndFooterPaths = ["/register", "/login", "/contact","/payment","/pricing","/explore"];
  const showNavAndFooter = !hideNavAndFooterPaths.includes(location.pathname);

  return (
    <>
      {showNavAndFooter && <NavBar />}
      
      <Routes>
        <Route path="/" element={<><Home /><Packages /></>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/gyming" element={<Gyming />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      
      {showNavAndFooter && <Footer />}
    </>
  );
};

export default App;
