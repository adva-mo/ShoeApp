import React from "react";
import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <div>
      <ul>
        <li>
          <NavLink
            className={(navData) => (navData.isActive ? "active" : "")}
            to={"/homepage"}
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
