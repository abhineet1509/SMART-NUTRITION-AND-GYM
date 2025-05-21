import React, { useState } from "react";
import "./Packages.css";
import dumbbells from "../assets/dumbbells.png";
import food from "../assets/food.png";
import gym from "../assets/gym.jpg";
import nutrition from "../assets/nutrition.jpg";
import { Link } from "react-router-dom";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const Packages = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqItems = [
    {
      question: "What is SmartNutrition?",
      answer:
        "SmartNutrition is a comprehensive fitness and nutrition program designed to help you achieve your health goals through personalized workout plans and dietary guidance tailored to your specific needs.",
    },
    {
      question: "How do I start my journey?",
      answer:
        "Getting started is easy! Simply sign up for an account, complete our quick assessment questionnaire, and you'll receive your customized plan within 24 hours.",
    },
    {
      question: "Are workouts suitable for beginners?",
      answer:
        "Absolutely! Our program includes modifications for all fitness levels, from complete beginners to advanced athletes. You'll start at the right level for your current fitness.",
    },
    {
      question: "Can I track my progress?",
      answer:
        "Yes, our platform includes progress tracking tools where you can log workouts, nutrition, measurements, and see your improvements over time with visual charts.",
    },
  ];

  const toggleItem = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="packages-container">
      <div className="package">
        <div className="text-content">
          <h2>
            One-off package <br />
            <strong>Training only</strong>
          </h2>
          <p>
            <strong>For just £30</strong> you can receive a training plan
            designed for your fitness goals. We will work together to tailor
            this plan based on your current fitness levels and what you are
            hoping to achieve short-term.
          </p>
        </div>
        <div className="image-content">
          <img src={dumbbells} alt="Dumbbells" />
        </div>
      </div>

      {/* Nutrition Package */}
      <div className="package">
        <div className="image-content">
          <img src={food} alt="Healthy Food" />
        </div>
        <div className="text-content">
          <h2>
            One-off package <br />
            <strong>Nutrition only</strong>
          </h2>
          <p>
            <strong>For just £30</strong> you can discover a nutrition plan
            based on your food preferences, dietary requirements, and
            incorporating your body goal needs. We will include your favourite
            foods and offer a short-term sustainable plan.
          </p>
        </div>
      </div>

      {/* Package Cards Section */}
      <section className="packages-section">
        <div className="package-card">
          <img src={gym} alt="Noovo Plus" className="package-image" />
          <h2  className="package-title">
              GYM & fit
            </h2>
          <div className="package-buttons">
            <Link to="/explore" className="btn explore-btn">
              Explore Plus
            </Link>
            <button className="btn inventory-btn">$ Premium</button>
          </div>
        </div>

        <div className="package-card">
          <img
            src={nutrition}
            alt="Our Vans for Sale"
            className="package-image"
          />
          <h2 className="package-title">Nutrition</h2>
          <div className="package-buttons">
            <Link to="/pricing" className="btn explore-btn">
              $ Premium
            </Link>
            <button className="btn inventory-btn">Explore Us</button>
          </div>
        </div>
      </section>

      <div className="faq-section">
      <div className="faq-image-container">
        <img
          src="https://images.unsplash.com/photo-1526676537331-7747bf8278fc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTF8fHJ1bm5pbmd8ZW58MHx8MHx8fDA%3D"
          alt="FAQ Section"
          className="faq-image"
        />
      </div>

      <div className="faq-content-container">
        <h2 className="faq-title">Frequently Asked Questions</h2>
        <div className="faq-list">
          {faqItems.map((item, index) => (
            <div key={index} className="faq-item">
              <div className="faq-question" onClick={() => toggleItem(index)}>
                <h3>{item.question}</h3>
                <span className="faq-icon">
                  {activeIndex === index ? <FaChevronUp /> : <FaChevronDown />}
                </span>
              </div>
              {activeIndex === index && (
                <div className="faq-answer">
                  <p>{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
      {/* Contact Section */}
      <div className="contact-container">
        <div className="contact-info">
          <p>
            <strong>Phone:</strong> (555) 123-4567
          </p>
          <p>
            <strong>WhatsApp:</strong> (555) 123-4567
          </p>
          <p>
            <strong>Email:</strong>{" "}
            <a href="mailto:info@smartnutritiongym.com">
              info@smartnutritiongym.com
            </a>
          </p>
          <p>
            <strong>Address:</strong> Bhopal, India
          </p>
          <p>
            <strong>Open Hours:</strong> Mon-Fri: 6am - 10pm, Sat-Sun: 8am - 8pm
          </p>
        </div>

        <hr className="section-divider" />

        <div className="map-section">
          <div className="map-container">
            <iframe
              title="Smart Nutrition Gym Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117270.75501437362!2d77.30056585!3d23.1993477!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397c428f8fd68fbd%3A0x2155716d572d4f8!2sBhopal%2C%20Madhya%20Pradesh%2C%20India!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus"
              width="100%"
              height="350"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            />
          </div>

          <div className="map-links">
            <a
              href="https://maps.google.com/?q=Bhopal,India"
              target="_blank"
              rel="noopener noreferrer"
            >
              Open in Google Maps
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Packages;
