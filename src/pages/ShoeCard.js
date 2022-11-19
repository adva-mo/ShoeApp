import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getShoeById } from "../utils/utils";
import Spinner from "../components/Spinner/Spinner";
import Delete from "../components/Delete";
import ShoeBox from "../components/ShoeBox";
import "./ShoeCard.css";

function ShoeCard({ shoes, dispatchShoes, setIsLoading, isLoading }) {
  const [currentShoe, setCurrentShoe] = useState(null);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!shoes) navigate("/");
    else setCurrentShoe(getShoeById(shoes, params.shoeID));
  }, [shoes, params.shoeID, navigate]);

  return (
    <>
      {isLoading && <Spinner />}
      {/* </> */}
      <div className="flex-row">
        {currentShoe ? (
          <div className="shoe-card">
            <ShoeBox
              currentShoe={currentShoe}
              isLoading={isLoading}
              shoeId={params.shoesID}
              setIsLoading={setIsLoading}
              dispatchShoes={dispatchShoes}
            />
            <Delete
              shoeID={params.shoeID}
              setIsLoading={setIsLoading}
              isLoading={isLoading}
              dispatchShoes={dispatchShoes}
              setCurrentShoe={setCurrentShoe}
              currentShoe={currentShoe}
            />
          </div>
        ) : (
          <div className="shoe-card">Shoe removed from the stock!</div>
        )}
      </div>
    </>
  );
}

export default ShoeCard;
