import React, { useState, useReducer } from "react";
import { Route } from "react-router-dom";
import data from "./data";
import { ProductContext } from "./contexts/ProductContext";
import { CartContext } from "./contexts/CartContext";

// Components
import Navigation from "./components/Navigation";
import Products from "./components/Products";
import ShoppingCart from "./components/ShoppingCart";

function cartReducer(state, action) {
	console.log('sunt in cartReducer: ', state)
	switch(action.type) {
		case 'ADD_ITEM':
			return [...state, action.payload.prod];
		case 'REMOVE_ITEM': 
			return state.filter((prod) => prod.id !== action.payload.idForRemove)
		default:
			return state;
	}
}

function App() {
  const [products] = useState(data);
  //const [cart, setCart] = useState([]);

  const [state, dispatch] = useReducer(cartReducer, []);

  const addItem = (item) => {
    // add the given item to the cart
	//setCart((prevCart) => [...prevCart, item]);
	dispatch({
		type: 'ADD_ITEM',
		payload: {
		   prod: item
		}
	})
  };

  const removeItem = (itemId) => {
	  dispatch({
		  type: 'REMOVE_ITEM',
		  payload: {
			  idForRemove: itemId
		  }
	  })
  }

  return (
    <div className="App">
      {/* Routes */}
      <ProductContext.Provider value={{ products: products, addItem: addItem }}>
        <CartContext.Provider value = {{cart: state, removeItem: removeItem}}>
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
