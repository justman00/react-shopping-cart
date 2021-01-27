import React, { createContext, useReducer } from "react";

export const CartContext = createContext();

const LOCALSTORAGE_KEY = "items";

const onWriteToLocalStorage = (items) => {
  const jsonItems = JSON.stringify(items);
  window.localStorage.setItem(LOCALSTORAGE_KEY, jsonItems);
  console.log("items", items);
};

const getLocalStorageItems = () => {
  const jsonItems = window.localStorage.getItem(LOCALSTORAGE_KEY);
  return jsonItems ? JSON.parse(jsonItems) : [];
};

const CartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      const updatedState = [...state, action.payload.cartItem];
      onWriteToLocalStorage(updatedState);
      return updatedState;
    case "REMOVE_ITEM":
      const filteredState = state.filter(
        (item) => item.id !== action.payload.itemId
      );
      onWriteToLocalStorage(filteredState);
      return filteredState;

    default:
      return state;
  }
};

function CartProvider(props) {
  const [state, dispatch] = useReducer(CartReducer, getLocalStorageItems());

  const addItem = (item) => {
    dispatch({
      type: "ADD_ITEM",
      payload: {
        cartItem: item,
      },
    });
  };

  const removeItem = (id) => {
    dispatch({
      type: "REMOVE_ITEM",
      payload: {
        itemId: id,
      },
    });
  };

  return (
    <CartContext.Provider
      value={{ state: state, addItem: addItem, removeItem: removeItem }}
    >
      {props.children}
    </CartContext.Provider>
  );
}
export default CartProvider;
