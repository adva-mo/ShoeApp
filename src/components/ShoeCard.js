import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getShoeById } from "../utils/utils";
import axios from "axios";

function ShoeCard({ shoes, dispatchShoes }) {
  let params = useParams();
  const [currentShoe, setCurrentShoe] = useState(null);

  useEffect(() => {
    setCurrentShoe(getShoeById(shoes, params.shoeID));
  }, []);

  async function handleDelete(id) {
    console.log(id);
    try {
      const response = await axios.delete(
        `https://6376932781a568fc2502553e.mockapi.io/shoes/${id}`
      );
      if (!response.data) throw new Error("errrrror");
      await dispatchShoes({
        type: "DELETE-SHOE",
        playload: id,
      });

      setCurrentShoe((prev) => {
        setTimeout(() => {
          console.log("navigate to shoes");
        }, 3000);
      });
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div>
      ShoeCard
      {currentShoe ? (
        <p>here is the shoe! {params.shoeID}</p>
      ) : (
        <p>show deleted success!</p>
      )}
      <button onClick={() => handleDelete(params.shoeID)}>delete shoe</button>
    </div>
  );
}

export default ShoeCard;
