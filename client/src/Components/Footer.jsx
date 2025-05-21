import { FaTwitter, FaFacebookF, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom"; // Import Link for navigation
import "./Footer.css";

export default function Footer() {
  return (
    <div className="footer-container">
      <div className="footer-content">
        <div>
          <h2 className="footer-title">
            Get stronger & healthier! Join our gym course & nutrition plan today!
          </h2>
          <button className="footer-button">Start 14 Days Free Trial</button>
        </div>
        <div className="footer-links">
          <div>
            <h3>Platform</h3>
            <ul>
              <li><Link to="/NotFound">About</Link></li>
              <li><Link to="/NotFound">Features</Link></li>
              <li><Link to="/NotFound">Pricing & Plans</Link></li>
              <li><Link to="/NotFound">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3>Resources</h3>
            <ul>
              <li><Link to="/NotFound">Account</Link></li>
              <li><Link to="/NotFound">Tools</Link></li>
              <li><Link to="/NotFound">Newsletter</Link></li>
              <li><Link to="/NotFound">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h3>Legals</h3>
            <ul>
              <li><Link to="/NotFound">Guides</Link></li>
              <li><Link to="/NotFound">Terms & Conditions</Link></li>
              <li><Link to="/NotFound">Privacy Policy</Link></li>
              <li><Link to="/NotFound">Licensing</Link></li>
            </ul>
          </div>
        </div>
      </div>
      <hr className="footer-divider" />
      <div className="footer-bottom">
        <p>Follow us on:</p>
        <div className="footer-icons">
          <FaTwitter className="icon" />
          <FaFacebookF className="icon" />
          <FaInstagram className="icon" />
        </div>
      </div>
    </div>
  );
}
