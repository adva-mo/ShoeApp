import React, { useEffect } from "react";
import Spinner from "../components/Spinner/Spinner";
import axios from "axios";
import { getGreeting, getTime } from "../utils/utils.js";
import "./HomePage.css";

function HomePage({ dispatchShoes, shoes, isLoading, setIsLoading }) {
  useEffect(() => {
    if (!shoes) getShoes();
    // eslint-disable-next-line
  }, [shoes]);

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
        <div className="flex-row home-notes-container">
          <div className="home-page-greeting">
            <div>
              <h1>{getGreeting()},</h1>
              <h1>managar!</h1>
            </div>
            <h3>the time: {getTime()}</h3>
          </div>
          <div className="stock-count">
            <p>
              you have <br></br>
              <span className="shoes-count">
                {shoes.length} <br></br>
              </span>
              shoes in stock!
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default HomePage;
