import React from "react";
import { useParams } from "react-router-dom";

function ShoeCard() {
  let shoeID = useParams();
  return (
    <div>
      ShoeCard
      <p>{console.log(shoeID)}</p>
    </div>
  );
}

export default ShoeCard;
