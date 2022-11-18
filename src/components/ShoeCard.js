import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { getShoeById } from "../utils/utils";
import axios from "axios";

function ShoeCard({ shoes, dispatchShoes }) {
  const [isEditable, setIsEditable] = useState(false);
  const newPrice = useRef("");
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

  const handleSubmit = (e) => {
    e && e.preventDefault();
  };
  const handleEditMember = (e) => {
    e.preventDefault();
    if (isEditable) {
      putShoe(params.shoeID, { price: newPrice.current.value }); //!
      setIsEditable((prev) => !prev);
    } else setIsEditable((prev) => !prev);
  };

  const putShoe = async (id, memberData) => {
    console.log("put");
    // console.log(id);
    // console.log(memberData);
    try {
      const response = await axios.put(
        `https://6376932781a568fc2502553e.mockapi.io/shoes/${id}`,
        memberData
      );

      console.log(response);
      if (!response.data) throw new Error("errrrror");
      await dispatchShoes({
        type: "EDIT-SHOE",
        playload: { price: memberData.price, id: id },
      });
      console.log("shoe updated");
    } catch {
      console.log("e");
    }
  };

  return (
    <div>
      ShoeCard
      {currentShoe ? (
        <div>
          <p>here is the shoe! {params.shoeID}</p>
          <form onSubmit={handleSubmit} className="shoe-card">
            <h3>{currentShoe.model}</h3>
            <p>brand: {currentShoe.brand}</p>
            <p>id: {currentShoe.id}</p>
            <p>color: {currentShoe.color}</p>
            <img src={`${currentShoe.img}`} alt="thumbnail" />
            <p>
              price:
              <input
                name="price"
                type="text"
                readOnly={!isEditable}
                placeholder={currentShoe.price}
                ref={newPrice}
              />
              $
            </p>
            <button onClick={handleEditMember}>
              {isEditable ? "ok" : "edit"}
            </button>
          </form>
        </div>
      ) : (
        <p>show deleted success!</p>
      )}
      <button onClick={() => handleDelete(params.shoeID)}>delete shoe</button>
    </div>
  );
}

export default ShoeCard;
