import React, { useContext } from "react";
import { ProductContext } from "../contexts/ProductContext";
import { CartContext } from "../contexts/CartProvider";
// Components
import Product from "./Product";

const Products = () => {
  const { products } = useContext(ProductContext);
  const { addItem } = useContext(CartContext);
  return (
    <div className="products-container">
      {products.map((product) => (
        <Product key={product.id} product={product} addItem={addItem} />
      ))}
    </div>
  );
};

export default Products;
