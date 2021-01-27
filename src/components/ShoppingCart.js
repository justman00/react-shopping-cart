import React, { useContext } from "react";
import { CartContext } from "../contexts/CartProvider";
// Components
import Item from "./ShoppingCartItem";

const ShoppingCart = () => {
  const { state, removeItem } = useContext(CartContext);
  const CartTotal = state
    .reduce((acc, value) => {
      return acc + value.price;
    }, 0)
    .toFixed(2);
  return (
    <div className="shopping-cart">
      {state.map((item) => (
        <Item key={item.id} {...item} removeItem={removeItem} />
      ))}

      <div className="shopping-cart__checkout">
        <p>Total: ${CartTotal}</p>
        <button>Checkout</button>
      </div>
    </div>
  );
};

export default ShoppingCart;
