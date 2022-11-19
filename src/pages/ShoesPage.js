import React, { useEffect } from "react";
import ShoePrev from "../components/ShoePrev";
import { v4 as uuid } from "uuid";

import "./shoesPage.css";
import { useNavigate } from "react-router-dom";

function ShoesPage({ shoes }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!shoes) navigate("/");
  }, [navigate, shoes]);

  return (
    <div>
      <div className="shoes-container">
        {shoes &&
          shoes.map((shoe) => {
            return <ShoePrev key={uuid()} {...shoe} />;
          })}
      </div>
    </div>
  );
}

export default ShoesPage;
