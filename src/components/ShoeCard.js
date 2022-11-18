import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getShoeById } from "../utils/utils";

function ShoeCard({ shoes }) {
  let shoeID = useParams();
  const [currentShoe, setCurrentShoe] = useState(null);

  useEffect(() => {
    setCurrentShoe(getShoeById(shoes, shoeID.shoeID));
  }, []);

  return (
    <div>
      ShoeCard
      {currentShoe && <p>here is the shoe! {shoeID.shoeID}</p>}
    </div>
  );
}

export default ShoeCard;
