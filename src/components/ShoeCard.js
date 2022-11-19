import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getShoeById } from "../utils/utils";
import axios from "axios";
import Spinner from "./Spinner/Spinner";
import Error from "./Error";
import "./ShoeCard.css";

function ShoeCard({ shoes, dispatchShoes, setIsLoading, isLoading }) {
  const [isEditable, setIsEditable] = useState(false);
  const [currentShoe, setCurrentShoe] = useState(null);
  const [isPriceValid, setIsPriceValid] = useState(true);
  const newPrice = useRef("");
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setCurrentShoe(getShoeById(shoes, params.shoeID));
  }, [shoes, params.shoeID]);

  const handleSubmit = (e) => {
    e.preventDefault();
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
      setCurrentShoe((prev) => null);
      setIsLoading((prev) => !prev);
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (e) {
      setIsLoading((prev) => !prev);
      console.log(e);
    }
  }

  const handleEditMember = (e) => {
    if (isLoading) return;
    e.preventDefault();
    if (isEditable) {
      if (newPrice.current.value <= 0) {
        setIsPriceValid((prev) => false);
        return;
      }
      putShoe(params.shoeID, { price: newPrice.current.value });
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
    <div className="flex-row">
      {/* {isError ?? <Error />} */}
      {isLoading && <Spinner />}
      {currentShoe ? (
        <div className="shoe-card">
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
                placeholder={currentShoe.price}
                ref={newPrice}
              />
              <span className="bold">$</span>
            </p>
            <button onClick={handleEditMember}>
              {isEditable ? "ok" : "edit"}
            </button>
          </form>
          <button onClick={() => handleDelete(params.shoeID)}>delete</button>
        </div>
      ) : (
        <p className="user-msg">shoe has been removed from the stock</p>
      )}
    </div>
  );
}

export default ShoeCard;
