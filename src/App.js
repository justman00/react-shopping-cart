import React, { useState, useReducer, useEffect } from "react";
import { Route } from "react-router-dom";
import data from "./data";
import { ProductContext } from "./contexts/ProductContext";
import { CartContext } from "./contexts/CartContext";

// Components
import Navigation from "./components/Navigation";
import Products from "./components/Products";
import ShoppingCart from "./components/ShoppingCart";

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM":
      const list = [...state, action.payload.prod];
      localStorage.setItem("key", JSON.stringify(list));
	  return list;
	  
    case "REMOVE_ITEM":
      const result = state.filter(
        (prod) => prod.id !== action.payload.idForRemove
      );
      localStorage.setItem("key", JSON.stringify(result));
      return result;
    default:
      return state;
  }
}

const getInitialState = () => {
  const data = localStorage.getItem("key");
  if (data) {
    return JSON.parse(data);
  }
  return [];
};

function App() {
  const [products] = useState(data);
  const [state, dispatch] = useReducer(cartReducer, getInitialState());

  const addItem = (item) => {
    // add the given item to the cart

    dispatch({
      type: "ADD_ITEM",
      payload: {
        prod: item,
      },
    });
  };

  const removeItem = (itemId) => {
    dispatch({
      type: "REMOVE_ITEM",
      payload: {
        idForRemove: itemId,
      },
    });
  };

  return (
    <div className="App">
      {/* Routes */}
      <ProductContext.Provider
        value = {{products: products, addItem: addItem,}}
      >
        <CartContext.Provider value={{ cart: state, removeItem: removeItem }}>
          <Navigation />
          <Route exact path="/">
            <Products />
          </Route>

          <Route path="/cart">
            <ShoppingCart />
          </Route>
        </CartContext.Provider>
      </ProductContext.Provider>
    </div>
  );
}

export default App;
