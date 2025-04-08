import React from "react";
import "./Payment.css";

const PaymentCardSettings = () => {
  return (
    <div className="card">
      <div className="card-title">Make a Payment</div>
      <div className="nav">
        <ul>
          <li><a href="#">Account</a></li>
          <li className="active"><a href="#">Payment</a></li>
        </ul>
      </div>
      <form>
        <span className="card-header">Saved cards:</span>
        <div className="row row-1">
          <div className="col-7">
            <img 
              src="https://img.icons8.com/color/48/000000/mastercard-logo.png" 
              alt="MasterCard" 
              className="card-icon"
            />
            <input 
              type="text" 
              placeholder="**** **** **** 3193" 
              readOnly 
            />
          </div>
          <div className="col-3">
            <a href="#" className="remove-link">Remove</a>
          </div>
        </div>
        
        <div className="row row-1">
          <div className="col-7">
            <img 
              src="https://img.icons8.com/color/48/000000/visa.png" 
              alt="Visa" 
              className="card-icon"
            />
            <input 
              type="text" 
              placeholder="**** **** **** 4296" 
              readOnly 
            />
          </div>
          <div className="col-3">
            <a href="#" className="remove-link">Remove</a>
          </div>
        </div>
        
        <span className="card-header">Add new card:</span>
        
        <div className="row row-1">
          <div className="col-12">
            <div className="card-label">Card holder name</div>
            <input type="text" placeholder="Bojan Viner" />
          </div>
        </div>
        
        <div className="row row-1">
          <div className="col-12">
            <div className="card-label">Card number</div>
            <input type="text" placeholder="5134-5264-4" />
          </div>
        </div>
        
        <div className="card-details">
          <div className="detail-group">
            <div className="card-label">Exp. date</div>
            <input type="text" placeholder="MM/YY" />
          </div>
          <div className="detail-group">
            <div className="card-label">CVV</div>
            <input type="text" placeholder="CVV" />
          </div>
        </div>
        
        <button type="submit" className="submit-btn">
          Add card
        </button>
      </form>
    </div>
  );
};

export default PaymentCardSettings;