
import React from "react";
import "./Pricing.css"; // Importing CSS for styles
import { Outlet, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlane,
  faRocket,
} from "@fortawesome/free-solid-svg-icons";
import { faTelegramPlane } from "@fortawesome/free-brands-svg-icons";

const pricingPlans = [
  {
    icon: faTelegramPlane,
    name: "Basic",
    price: "$4.99",
    features: [
      "Unlimited Website",
      "Unlimited Storage",
      "Free SSL Certificate",
      "24/7 Support",
    ],
  },
  {
    icon: faPlane,
    name: "Intermediate",
    price: "$12.99",
    features: [
      "Unlimited Website",
      "Unlimited Storage",
      "Free SSL Certificate",
      "24/7 Support",
    ],
  },
  {
    icon: faRocket,
    name: "Advanced",
    price: "$19.99",
    features: [
      "Unlimited Website",
      "Unlimited Storage",
      "Free SSL Certificate",
      "24/7 Support",
    ],
  },
];

const PricingPlans = () => {
  const navigate = useNavigate();
  return (
    <div className="container">
      <h5 className="badge">Pricing Plans</h5>
      <h1 className="heading">Choose Your Best Pricing Plan</h1>
      <div className="card_group">
        {pricingPlans.map((plan, index) => (
          <div key={index} className="pricing-card">
            {/* Render Font Awesome Icon */}
            <FontAwesomeIcon icon={plan.icon} className="icon" size="2x" />
            <span>{plan.name}</span>
            <h4 className="price">{plan.price}</h4>
            <ul className="package_list">
              {plan.features.map((feature, idx) => (
                <li key={idx}>{feature}</li>
              ))}
            </ul>
            <button onClick={() => navigate("/payment")} className="get_started_btn">
              Get Started
            </button>
            <Outlet />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingPlans;

