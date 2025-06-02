import React from 'react';
import './Contact.css'; // We'll create this CSS file
import ContactImg from '../assets/Contactimg.png'; // Ensure correct path

const ContactSection = () => {
  return (
    <section className="custom-contact-container">
      <div className="custom-contact-content">
        <div className="custom-contact-text-content">
          <h1 className="custom-contact-title">Contact Us</h1>
          <p className="custom-contact-subtitle">We'd love to hear from you</p>
          <p className="custom-contact-text">
            Have questions or need assistance? Reach out to our team anytime.
          </p>
          <div className="custom-contact-info">
            <p>📞 Phone: (555) 123-4567</p>
            <p>✉️ Email: info@example.com</p>
            <p>📍 Address: 123 Main St, City</p>
          </div>
        </div>
        <div className="custom-contact-image">
          <img src={ContactImg} alt="Contact illustration" className="custom-contact-img" />
        </div>
      </div>

      <div className="custom-contact-options">
        <div className="custom-contact-card">
          <h2 className="custom-option-title">Support</h2>
          <p className="custom-option-text">Get help with any issues or questions you may have.</p>
          <button className="custom-option-button">Contact Support</button>
        </div>
        <div className="custom-contact-card">
          <h2 className="custom-option-title">Sales</h2>
          <p className="custom-option-text">Interested in our products? Talk to our sales team.</p>
          <button className="custom-option-button">Contact Sales</button>
        </div>
        <div className="custom-contact-card">
          <h2 className="custom-option-title">Feedback</h2>
          <p className="custom-option-text">We value your input to improve our services.</p>
          <button className="custom-option-button">Share Feedback</button>
        </div>
      </div>

      <footer className="custom-contact-footer">
        <div className="custom-footer-links">
          <a href="#" className="custom-footer-link">Facebook</a>
          <a href="#" className="custom-footer-link">Twitter</a>
          <a href="#" className="custom-footer-link">Instagram</a>
          <a href="#" className="custom-footer-link">LinkedIn</a>
        </div>
      </footer>
    </section>
 
  );
};

export default ContactSection;