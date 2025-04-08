import { Link } from "react-router-dom";
import Error from "../assets/Error.mp4";
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found-container">
      <video autoPlay loop muted className="not-found-video">
        <source src={Error} type="video/mp4" />
      </video>
      <Link to="/" className="home-button">Go Back Home</Link>
    </div>
  );
};

export default NotFound;
