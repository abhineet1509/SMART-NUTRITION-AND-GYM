
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDumbbell, faRunning, faStar } from '@fortawesome/free-solid-svg-icons';

const pricingPlans = [
  {
    icon: faDumbbell, // (Use a gym-related icon if you have it)
    name: "Basic",
    price: "$9.99 / month",
    features: [
      "Access to gym equipment",
      "1 Personal training session/month",
      "Basic nutrition plan",
      "Community support",
    ],
  },
  {
    icon: faRunning, // (Use a fitness or running icon)
    name: "Elite",
    price: "$29.99 / month",
    features: [
      "Unlimited gym access",
      "4 Personal training sessions/month",
      "Customized nutrition plan",
      "Access to group classes",
      "Priority customer support",
    ],
  },
  {
    icon: faStar, // (Use a premium icon)
    name: "Pro",
    price: "$49.99 / month",
    features: [
      "24/7 gym access",
      "Unlimited personal training",
      "Personalized meal & workout plans",
      "One-on-one nutrition coaching",
      "Exclusive wellness workshops",
      "VIP customer support",
    ],
  },
];


const PricingPlans = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-2 py-10 bg-white">
      <h5 className="uppercase text-gray-700 tracking-wide text-lg font-semibold">
        Pricing Plans
      </h5>
      <h1 className="text-3xl font-bold mt-2 mb-8 text-center text-gray-900">
        Choose Your Best Pricing Plan
      </h1>

      <div className="flex flex-wrap items-center justify-center gap-6">
        {pricingPlans.map((plan, idx) => (
          <div
            key={idx}
            className="bg-gradient-to-b from-blue-100 to-blue-50 px-2 py-8 mt-6 mb-6  w-[275px] h-[400px] rounded-xl flex flex-col items-center justify-center shadow-md hover:shadow-xl hover:scale-105 transition-transform duration-300"
          >
            {/* Icon */}
            <div className="h-14 w-14 flex items-center justify-center text-2xl text-blue-700 bg-white rounded-full shadow-md">
              <FontAwesomeIcon icon={plan.icon} />
            </div>

           
            <div className="text-center">
              <span className="text-blue-600 font-semibold text-sm uppercase">
                {plan.name}
              </span>
              <h4 className="text-2xl font-bold mt-2">{plan.price}</h4>

        <p className="text-gray-600 text-sm list-none">
          {plan.features.map((feature, fi) => (
            <li key={fi}>{feature}</li>
          ))}
        </p>
</div >
<div type="button" onClick={() => navigate("/payment")} class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2 text-center me-2 mb-2">Get Started</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingPlans;
