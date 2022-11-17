import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import NavBar from "./components/NavBar";
import ShoesPage from "./pages/ShoesPage";
import AddShoe from "./components/AddShoe";

import "./App.css";

function App() {
  return (
    <div>
      <NavBar />
      <main>
        <Routes>
          <Route path="/" element={<Navigate replace to="/HomePage" />} />
          {/* if the page doesnt exist-redirect to the home page */}
          <Route path="/*" element={<Navigate replace to="/HomePage" />} />
          <Route path="/HomePage" element={<HomePage />} />
          <Route path="/ShoesPage" element={<ShoesPage />} />
          <Route path="/addShoe" element={<AddShoe />} />

          {/* <Route path="/products/:productId" element={<ProductDetail />} /> */}
        </Routes>
      </main>
    </div>
  );
}

export default App;
