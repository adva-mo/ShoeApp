import React from "react";
import "./ShoeCrad.css";

function ShoeCard({ model, brand, color, price, img }) {
  return (
    <div className="shoe-card">
      ShoeCard
      <p>Model: {model}</p>
      <p>Brand: {brand}</p>
      <p>Color: {color}</p>
      <p>Price: {price}</p>
      <img src={`${img}`} alt="shoe-img" />
    </div>
  );
}

export default ShoeCard;
