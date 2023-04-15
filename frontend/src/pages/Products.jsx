import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { CartContext } from "../context/CartItems";
import { CountContext } from "../context/ItemCount";
import Product from "../components/Product";
const Products = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios.get("/api/allProducts").then(({ data }) => {
      setProducts(data);
    });
  }, []);
  return (
    <div className="max-w-screen-2xl h-full bg-gray-100 mx-auto">
      <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mx-4">
        {products.length > 0 &&
          products.map((product) => (
            <Product
              product={product}
              key={product.ownerEmail + product.title}
            />
          ))}
      </div>
    </div>
  );
};

export default Products;
