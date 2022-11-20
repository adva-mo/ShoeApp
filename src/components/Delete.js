import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Delete({
  dispatchShoes,
  setIsLoading,
  setCurrentShoe,
  shoeID,
  isLoading,
  currentShoe,
}) {
  const navigate = useNavigate();

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
      }, 2000);
    } catch (e) {
      setIsLoading((prev) => !prev);
      console.log(e);
    }
  }
  return (
    <>
      <button onClick={() => handleDelete(shoeID)}>Delete</button>
    </>
  );
}

export default Delete;
