import React from "react";
import NavBar from "../Components/NavBar";
import gymVideo from "../assets/gym-video.webm"; // Update path if needed

export default function Home() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
    <NavBar />
    <video
      autoPlay
      loop
      muted
      className="absolute inset-0 w-full h-full object-cover brightness-50 -z-10"
    >
      <source src={gymVideo} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  
    <div className="absolute inset-0 flex items-end justify-center text-[#b9e358] font-poppins">
      <h1 className=" leading-none text-center"
          style={{
            fontSize: "20vw", 
            lineHeight: 1,
          }}
      >
        FITWORK
      </h1>
    </div>
  </div>
  
  
  );
}
