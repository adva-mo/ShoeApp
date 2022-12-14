import React from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";

function NavBar() {
  return (
    <div className="nav-bar">
      <ul className="flex-row">
        <li>
          <NavLink
            className={(navData) => (navData.isActive ? "active" : "")}
            to={"/"}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            className={(navData) => (navData.isActive ? "active" : "")}
            to={"/shoespage"}
          >
            Shoes
          </NavLink>
        </li>
        <li>
          <NavLink
            className={(navData) => (navData.isActive ? "active" : "")}
            to={"/addshoe"}
          >
            Add shoe
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default NavBar;
