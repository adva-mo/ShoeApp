import React, { useState } from "react";
import axios from "axios";
import Spinner from "./Spinner/Spinner";
import { isFormValid } from "../utils/utils.js";
import "./AddShoe.css";

function AddShoe({ dispatchShoes, isLoading, setIsLoading }) {
  const [posted, setPosted] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newShoe = Object.fromEntries(formData);
    if (isFormValid(newShoe)) {
      // console.log("valid");
      postNewShoe(newShoe);
      // console.log(newShoe);
      e.target.reset();
    } else {
      console.log("not valid");
    }
  };

  const postNewShoe = async (obj) => {
    setIsLoading((prev) => !prev);
    try {
      const result = await axios.post(
        "https://6376932781a568fc2502553e.mockapi.io/shoes",
        obj
      );
      if (!result.data) throw new Error("ERROR ADDING");
      console.log(result.data);
      await dispatchShoes({
        type: "ADD-SHOE",
        playload: obj,
      });
      setIsLoading((prev) => !prev);
      setPosted((prev) => !prev);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="flex-column add-shoe-container">
      <form onSubmit={submitHandler}>
        <div className="form-container">
          <div>
            <p>
              id <span className="requiered">*</span>
            </p>
            <input name="id" type="number"></input>
          </div>
          <div>
            <p>
              model <span className="requiered">*</span>
            </p>
            <input name="model" type="text"></input>
          </div>
          <div>
            <p>
              link to picture <span className="requiered">*</span>
            </p>
            <input name="img" type="text"></input>
          </div>
          <div>
            <p>
              brand <span className="requiered">*</span>
            </p>
            <input name="brand" type="text"></input>
          </div>
          <div>
            <p>
              color <span className="requiered">*</span>
            </p>
            <input name="color" type="text"></input>
          </div>
          <div>
            <p>
              price <span className="requiered">*</span>
            </p>
            <input name="price" type="number"></input>
          </div>
          <button>add</button>
          {posted && (
            <p style={{ textAlign: "center", marginTop: "0.3rem" }}>
              Shoe added to the stock!
            </p>
          )}
        </div>
      </form>
      {/* {isLoading && <Spinner />} */}
    </div>
  );
}

export default AddShoe;
