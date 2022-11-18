import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { getShoeById, isFormValid } from "../utils/utils";
import axios from "axios";
import Spinner from "./Spinner/Spinner";

function ShoeCard({ shoes, dispatchShoes, setIsLoading, isLoading }) {
  const [isEditable, setIsEditable] = useState(false);
  const [currentShoe, setCurrentShoe] = useState(null);
  const newPrice = useRef("");
  let params = useParams();

  useEffect(() => {
    setCurrentShoe(getShoeById(shoes, params.shoeID));
  }, []);

  const handleSubmit = (e) => {
    e && e.preventDefault();
  };

  async function handleDelete(id) {
    if (isLoading) return;
    setIsLoading((prev) => !prev);
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
        return null;
      });
      setIsLoading((prev) => !prev);
    } catch (e) {
      console.log(e);
    }
  }

  const handleEditMember = (e) => {
    if (isLoading) return;
    e.preventDefault();
    if (isEditable) {
      if (newPrice.current.value <= 0) return; //user didnt entered price
      putShoe(params.shoeID, { price: newPrice.current.value });
      setIsEditable((prev) => !prev);
    } else setIsEditable((prev) => !prev);
  };

  const putShoe = async (id, memberData) => {
    setIsLoading((prev) => !prev);
    try {
      const response = await axios.put(
        `https://6376932781a568fc2502553e.mockapi.io/shoes/${id}`,
        memberData
      );
      if (!response.data) throw new Error("errrrror");
      await dispatchShoes({
        type: "EDIT-SHOE",
        playload: { price: memberData.price, id: id },
      });
      setIsLoading((prev) => !prev);
      console.log("shoe updated");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      {isLoading && <Spinner />}
      {currentShoe ? (
        <div>
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
        <p>shoe deleted</p>
      )}
      {currentShoe && (
        <button onClick={() => handleDelete(params.shoeID)}>delete shoe</button>
      )}
    </div>
  );
}

export default ShoeCard;
