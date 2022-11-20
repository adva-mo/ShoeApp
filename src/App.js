import React, { useReducer, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { shoesReducer } from "./utils/reducer";

import HomePage from "./pages/HomePage";
import NavBar from "./components/NavBar";
import ShoesPage from "./pages/ShoesPage";
import AddShoe from "../src/pages/AddShoe";
import ShoeCard from "../src/pages/ShoeCard";

import "./App.css";
import Spinner from "./components/Spinner/Spinner";

function App() {
  const [shoes, dispatchShoes] = useReducer(shoesReducer, null);
  const [isLoading, setIsLoading] = useState(!shoes);

  return (
    <div>
      <NavBar />
      <main className="main-box">
        {isLoading && <Spinner />}
        <Routes>
          {/* <Route path="*" element={<Navigate replace to="/" />} /> */}
          <Route path="/Shoespage" element={<ShoesPage shoes={shoes} />} />
          <Route
            path="/"
            element={
              <HomePage
                dispatchShoes={dispatchShoes}
                shoes={shoes}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
              />
            }
          />
          <Route
            path="/addShoe"
            element={
              <AddShoe
                dispatchShoes={dispatchShoes}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                shoes={shoes}
              />
            }
          />
          <Route
            path="/Shoespage/:shoeID"
            element={
              <ShoeCard
                shoes={shoes}
                dispatchShoes={dispatchShoes}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
              />
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
