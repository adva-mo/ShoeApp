import React from "react";
import { Link } from "react-router-dom";
import "./ShoePrev.css";

function shoePrev({ model, img, id, price }) {
  return (
    <div className="shoe-prev">
      <Link to={`/shoespage/${id}`}>
        <p>Model: {model}</p>
        <p>Price: {price} $</p>
        <img src={`${img}`} alt="shoe-img" />
      </Link>
    </div>
  );
}

export default shoePrev;
