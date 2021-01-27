import React, { useState } from "react";
import { Route } from "react-router-dom";
import data from "./data";
import { ProductContext } from "./contexts/ProductContext";
import { CartContext } from "./contexts/CartContext";
// Components
import Navigation from "./components/Navigation";
import Products from "./components/Products";
import ShoppingCart from "./components/ShoppingCart";

const LOCALSTORAGE_KEY = "items";

function App() {
  const [products] = useState(data);
  const localStorageItems = window.localStorage.getItem(LOCALSTORAGE_KEY);
  const [cart, setCart] = useState(
    localStorageItems ? JSON.parse(localStorageItems) : []
  );

  const onWriteToLocalStorage = (items) => {
    const jsonItems = JSON.stringify(items);
    window.localStorage.setItem(LOCALSTORAGE_KEY, jsonItems);
  };

  const onUpdateLocalStorageData = (items) => {
    setCart(items);
    onWriteToLocalStorage(items);
    console.log("localStorage items", items);
  };

  const addItem = (item) => {
    // add the given item to the cart
    onUpdateLocalStorageData([...cart, item]);
  };

  const removeItem = (id) => {
    const filteredCart = cart.filter((item) => {
      return item.id !== id;
    });
    onUpdateLocalStorageData(filteredCart);
  };

  return (
    <div className="App">
      <ProductContext.Provider value={{ products, addItem }}>
        <CartContext.Provider value={{ cart, removeItem }}>
          <Navigation />
          {/* Routes */}
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
