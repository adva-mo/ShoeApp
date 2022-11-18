import React, { useState } from "react";
import axios from "axios";
import Spinner from "./Spinner/Spinner";

function AddShoe({ dispatchShoes, isLoading, setIsLoading }) {
  const [posted, setPosted] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newShoe = Object.fromEntries(formData);
    postNewShoe(newShoe);
    console.log(newShoe);
    e.target.reset();
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
    <div>
      AddShoe
      <div className="flex-column">
        <form onSubmit={submitHandler}>
          <fieldset className="">
            <legend>Add new shoe</legend>
            <div>
              model:
              <input name="model" type="text"></input>
            </div>
            <div>
              link to picture:
              <input name="img" type="text"></input>
            </div>
            <div>
              brand:
              <input name="brand" type="text"></input>
            </div>
            <div>
              color:
              <input name="color" type="text"></input>
            </div>
            <div>
              price:
              <input name="price" type="number"></input>
            </div>

            <button>add</button>
          </fieldset>
        </form>
        {isLoading && <Spinner />}
        {posted && (
          // setTimeout(() => {
          //   <p>added successfully</p>;
          // }, 2000)
          <p>SUCCESS</p>
        )}
      </div>
    </div>
  );
}

export default AddShoe;
