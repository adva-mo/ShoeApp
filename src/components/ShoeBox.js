import React from "react";
import { useState, useRef } from "react";
import axios from "axios";

function ShoeBox({
  shoeId,
  currentShoe,
  isLoading,
  setIsLoading,
  dispatchShoes,
}) {
  const [isEditable, setIsEditable] = useState(false);
  const [isPriceValid, setIsPriceValid] = useState(true);
  const newPrice = useRef("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleEditMember = (e) => {
    if (isLoading) return;
    e.preventDefault();
    if (isEditable) {
      if (newPrice.current.value <= 0) {
        setIsPriceValid((prev) => false);
        return;
      }
      putShoe(shoeId, { price: newPrice.current.value });
      setIsEditable((prev) => !prev);
      setIsPriceValid((prev) => true);
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
    } catch (e) {
      setIsLoading((prev) => !prev);
      console.log(e);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{currentShoe.model}</h2>
      <p>
        <span className="bold"> model: </span>
        {currentShoe.brand}
      </p>
      <p>
        <span className="bold"> brand: </span>
        {currentShoe.model}
      </p>
      <p>
        <span className="bold"> id: </span>
        {currentShoe.id}
      </p>
      <p>
        <span className="bold"> color: </span>
        {currentShoe.color}
      </p>
      <img src={`${currentShoe.img}`} alt="thumbnail" />
      <p>
        <span className="bold"> price: </span>
        <input
          className={!isPriceValid ? "not-valid" : ""}
          name="price"
          type="text"
          readOnly={!isEditable}
          defaultValue={currentShoe.price}
          ref={newPrice}
        />
        <span className="bold">$</span>
      </p>
      <button onClick={handleEditMember}>{isEditable ? "ok" : "edit"}</button>
    </form>
  );
}

export default ShoeBox;
