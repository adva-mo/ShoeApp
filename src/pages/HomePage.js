import React, { useState, useEffect } from "react";
import Spinner from "../components/Spinner/Spinner";
import axios from "axios";
import { getGreeting, getTime } from "../utils/utils.js";

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
          <h1>{getGreeting()}, mananger!</h1>
          <h3>the time: {getTime()}</h3>
          <p>you have {shoes.length} shoes in stock!</p>
        </div>
      )}
    </>
  );
}

export default HomePage;
