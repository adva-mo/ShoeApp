import React, { useEffect, useReducer } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { shoesReducer } from "./utils/reducer";

import HomePage from "./pages/HomePage";
import NavBar from "./components/NavBar";
import ShoesPage from "./pages/ShoesPage";
import AddShoe from "./components/AddShoe";
import axios from "axios";

import "./App.css";

function App() {
  const [shoes, dispatchShoes] = useReducer(shoesReducer, null);

  useEffect(() => {
    getShoes();
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
      // setIsLoading((PREV) => !PREV);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <NavBar />
      <main>
        <Routes>
          <Route path="/" element={<Navigate replace to="/HomePage" />} />
          {/* if the page doesnt exist-redirect to the home page */}
          <Route path="/*" element={<Navigate replace to="/HomePage" />} />
          <Route path="/HomePage" element={<HomePage />} />
          <Route path="/ShoesPage" element={<ShoesPage shoes={shoes} />} />
          <Route
            path="/addShoe"
            element={<AddShoe dispatchShoes={dispatchShoes} />}
          />

          {/* <Route path="/products/:productId" element={<ProductDetail />} /> */}
        </Routes>
      </main>
    </div>
  );
}

export default App;
