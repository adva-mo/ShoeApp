import React from "react";
import ShoePrev from "../components/ShoePrev";
import { v4 as uuid } from "uuid";

import "./shoesPage.css";

function ShoesPage({ shoes }) {
  return (
    <div>
      <div className="shoes-container">
        {shoes.map((shoe) => {
          return <ShoePrev key={uuid()} {...shoe} />;
        })}
      </div>
    </div>
  );
}

export default ShoesPage;
