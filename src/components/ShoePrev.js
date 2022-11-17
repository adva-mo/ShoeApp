import React from "react";
import { Link } from "react-router-dom";
import "./ShoeCrad.css";

function shoePrev({ brand, img, id }) {
  return (
    <div className="shoe-card">
      <Link to={`/shoespage/${id}`}>
        shoePrev
        {/* <p>Model: {model}</p> */}
        <p>Brand: {brand}</p>
        {/* <p>Color: {color}</p> */}
        {/* <p>Price: {price}</p> */}
        <img src={`${img}`} alt="shoe-img" />
      </Link>
    </div>
  );
}

export default shoePrev;
