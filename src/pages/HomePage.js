import React, { useState, useEffect } from "react";
import Spinner from "../components/Spinner/Spinner";
import axios from "axios";

function HomePage({ dispatchShoes, shoes, isLoading, setIsLoading }) {
  // const [isLoading, setIsLoading] = useState(!shoes);

  useEffect(() => {
    if (!shoes) getShoes();
  }, []);

  const getShoes = async () => {
    try {
      const response = await axios.get(
        "https://6376932781a568fc2502553e.mockapi.io/shoes"
      );
      if (response)
        dispatchShoes({
          type: "FETCHED",
          playload: [...response.data],
        });
      setIsLoading((PREV) => !PREV);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div>
          hello mananger!
          <p>you have {shoes.length} shoes in stock!</p>
        </div>
      )}
    </>
  );
}

export default HomePage;
