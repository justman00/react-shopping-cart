import React from "react";
import { NavLink } from "react-router-dom";
import { CartContext } from "../contexts/CartProvider";

const Navigation = () => {
  return (
    <CartContext.Consumer>
      {({ state }) => {
        return (
          <div className="navigation">
            <NavLink to="/">Products</NavLink>
            <NavLink to="/cart">
              Cart <span>{state.length}</span>
            </NavLink>
          </div>
        );
      }}
    </CartContext.Consumer>
  );
};

export default Navigation;
