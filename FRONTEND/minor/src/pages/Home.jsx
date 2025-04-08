import React from "react";
import "./Home.css";
import gymVideo from "../assets/gym-video.webm";
import NavBar from "../Components/NavBar";

const Home = () => {
  return (
    <div className="home-container">
      <NavBar />
      <video autoPlay loop muted className="background-video">
        <source src={gymVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="bottom-text">
        <h2>FitTech</h2>
      </div>
    </div>
  );
};

export default Home;



