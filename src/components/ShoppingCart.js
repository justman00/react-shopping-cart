import React from "react";
import { CartContext } from "../contexts/CartContext";
// Components
import Item from "./ShoppingCartItem";

const ShoppingCart = () => {
  return (
    <CartContext.Consumer>
      {(value) => {
        const getCartTotal = () => {
          return value.cart
            .reduce((acc, value) => {
              return acc + value.price;
            }, 0)
            .toFixed(2);
        };
        return (
          <div className="shopping-cart">
            {value.cart.map((item) => (
              <Item key={item.id} {...item} removeItem={value.removeItem} />
            ))}

            <div className="shopping-cart__checkout">
              <p>Total: ${getCartTotal()}</p>
              <button>Checkout</button>
            </div>
          </div>
        );
      }}
    </CartContext.Consumer>
  );
};

export default ShoppingCart;
