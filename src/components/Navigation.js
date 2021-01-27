import React from "react";
import { NavLink } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";

const Navigation = () => {
  return (
    <CartContext.Consumer>
      {(value) => {
        return (
          <div className="navigation">
            <NavLink to="/">Products</NavLink>
            <NavLink to="/cart">
              Cart <span>{value.cart.length}</span>
            </NavLink>
          </div>
        );
      }}
    </CartContext.Consumer>
  );
};

export default Navigation;
