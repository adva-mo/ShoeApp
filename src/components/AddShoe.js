import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { isFormValid } from "../utils/utils.js";
import "./AddShoe.css";

function AddShoe({ dispatchShoes, setIsLoading, shoes }) {
  const [posted, setPosted] = useState(false);
  const [isformValid, setIsformValid] = useState(true);

  const lastIDregistered = Number(shoes[shoes.length - 1].id);
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newShoe = Object.fromEntries(formData);
    if (isFormValid(newShoe)) {
      setIsformValid(true);
      postNewShoe(newShoe);
      e.target.reset();
    } else {
      setIsformValid(false);
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
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="flex-column add-shoe-container">
      <form onSubmit={submitHandler}>
        {posted && (
          <p style={{ textAlign: "center", marginTop: "0.3rem" }}>
            Shoe added to the stock!
          </p>
        )}
        <div className="form-container">
          <div>
            <p>id:</p>
            <input
              contentEditable={false}
              defaultValue={lastIDregistered + 1}
              name="id"
              type="text"
              className={!isformValid ? "not-valid" : ""}
            ></input>
          </div>
          <div>
            <p>
              model <span className="requiered">*</span>
            </p>
            <input
              name="model"
              type="text"
              className={!isformValid ? "not-valid" : ""}
            ></input>
          </div>
          <div>
            <p>
              link to picture <span className="requiered">*</span>
            </p>
            <input
              name="img"
              type="text"
              className={!isformValid ? "not-valid" : ""}
            ></input>
          </div>
          <div>
            <p>
              brand <span className="requiered">*</span>
            </p>
            <input
              name="brand"
              type="text"
              className={!isformValid ? "not-valid" : ""}
            ></input>
          </div>
          <div>
            <p>
              color <span className="requiered">*</span>
            </p>
            <input
              name="color"
              type="text"
              className={!isformValid ? "not-valid" : ""}
            ></input>
          </div>
          <div>
            <p>
              price <span className="requiered">*</span>
            </p>
            <input
              name="price"
              type="number"
              className={!isformValid ? "not-valid" : ""}
            ></input>
          </div>
          <button>add</button>
        </div>
      </form>
    </div>
  );
}

export default AddShoe;
