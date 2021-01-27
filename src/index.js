import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, withRouter } from "react-router-dom";
import "./sass/index.scss";
import App from "./App";
import CartProvider from "./contexts/CartProvider";
const AppWithRouter = withRouter(App);

ReactDOM.render(
  <CartProvider>
    <Router>
      <AppWithRouter />
    </Router>
  </CartProvider>,
  document.getElementById("root")
);
