import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { isFormValid, getEmptyFields } from "../utils/utils.js";
import "./AddShoe.css";

function AddShoe({ dispatchShoes, setIsLoading, shoes }) {
  const [posted, setPosted] = useState(false);
  // eslint-disable-next-line
  const [isformValid, setIsformValid] = useState(true);
  const [notValids, setnotValids] = useState([]);
  let lastIDregistered;
  if (shoes) {
    lastIDregistered = shoes && Number(shoes[shoes.length - 1].id);
  }
  const navigate = useNavigate();

  useEffect(() => {
    if (!shoes) navigate("/");
  }, [navigate, shoes]);

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newShoe = Object.fromEntries(formData);
    if (isFormValid(newShoe)) {
      setIsformValid(true);
      postNewShoe(newShoe);
      e.target.reset();
    } else {
      setnotValids(getEmptyFields(newShoe));
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
    <>
      <form onSubmit={submitHandler}>
        {posted && (
          <div style={{ marginTop: "6rem" }} className="form-container">
            Shoe added to the stock!
          </div>
        )}
        {!posted && (
          <div className="form-container">
            <div>
              <p>id:</p>
              <input
                readOnly={true}
                defaultValue={lastIDregistered ? lastIDregistered + 1 : ""}
                name="id"
                type="text"
              ></input>
            </div>
            <div>
              <p>
                model <span className="requiered">*</span>
              </p>
              <input
                name="model"
                type="text"
                className={notValids.includes("model") ? "not-valid" : ""}
              ></input>
            </div>
            <div>
              <p>
                link to picture <span className="requiered">*</span>
              </p>
              <input
                name="img"
                type="text"
                className={notValids.includes("img") ? "not-valid" : ""}
              ></input>
            </div>
            <div>
              <p>
                brand <span className="requiered">*</span>
              </p>
              <input
                name="brand"
                type="text"
                className={notValids.includes("brand") ? "not-valid" : ""}
              ></input>
            </div>
            <div>
              <p>
                color <span className="requiered">*</span>
              </p>
              <input
                name="color"
                type="text"
                className={notValids.includes("color") ? "not-valid" : ""}
              ></input>
            </div>
            <div>
              <p>
                price <span className="requiered">*</span>
              </p>
              <input
                name="price"
                type="number"
                className={notValids.includes("price") ? "not-valid" : ""}
              ></input>
            </div>
            <button>add</button>
          </div>
        )}
      </form>
    </>
  );
}

export default AddShoe;
