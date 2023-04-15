import React, { useState, useContext } from "react";
import { CartContext } from "../context/CartItems";
import { CountContext } from "../context/ItemCount";
import { UserContext } from "../context/UserContext";
import axios from "axios";
const Product = ({ product }) => {
  const [qty, setQty] = useState(0);
  const { cart, setCart } = useContext(CartContext);
  const { count, setCount } = useContext(CountContext);
  const { user } = useContext(UserContext);
  async function addToCart(product) {
    if (user) {
      const pro = {};
      for (const key in product) {
        pro[key] = product[key];
      }
      const user = await axios.get("/api/profile");
      pro.buyer = user.data.name;
      pro.buyerEmail = user.data.email;
      pro.qty = qty;
      pro.amount = qty * product.price;
      setCart((prev) => {
        return [...prev, pro];
      });
      setCount((prev) => {
        return (prev = prev + 1);
      });
    } else {
      alert("Please Login first!");
    }
  }
  return (
    <div
      className="relative flex flex-col  border border-gray-200 rounded-md"
      key={product.ownerEmail + product.title}
    >
      <div></div>
      <img
        src={product.addedPhotos[0]}
        alt=""
        className="h-48 w-full object-contain rounded-md"
      />
      {product.perks.includes("ss") && (
        <div className="absolute right-0 p-1 mt-2 bg-[#F7DB6A] w-fit text-primary">
          Season Special
        </div>
      )}
      <div className="flex flex-col px-4 h-full pb-4">
        <div className="flex mt-2">
          <div className="flex-grow"></div>
          <div>Sold by {product.owner}</div>
        </div>
        <div className="font-bold text-2xl ">{product.title}</div>
        <div className="flex-grow break-words">
          {product.description.length > 120
            ? product.description.substring(0, 120) + "...."
            : product.description}
        </div>
        <div>
          <div className="flex flex-col md:flex-row gap-4 mt-4 md:mt-0">
            {product.perks.includes("fhd") && (
              <label className="px-4 md:px-2 md:mt-4 pb-1 bg-[#F7DB6A] md:w-fit">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4 inline"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                  />
                </svg>
                <span className="text-xs ml-1">Free Home Delivery</span>
              </label>
            )}
            {product.perks.includes("ed") && (
              <label className="px-4 md:px-2 md:mt-4 pb-1 bg-[#F7DB6A] md:w-fit">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4 inline"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 14.25l6-6m4.5-3.493V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185zM9.75 9h.008v.008H9.75V9zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.125 4.5h.008v.008h-.008V13.5zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                  />
                </svg>
                <span className="text-xs ml-1">Extra 10% off</span>
              </label>
            )}
            {product.perks.includes("cod") && (
              <label className="px-4 md:px-2 md:mt-4 pb-1 bg-[#F7DB6A] md:w-fit">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4 inline"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
                  />
                </svg>

                <span className="text-xs ml-1">Cash on Delivery</span>
              </label>
            )}
          </div>
          <input
            type="number"
            className="mt-4 rounded-md w-32 outline-none"
            value={qty}
            onChange={(ev) => {
              setQty(ev.target.value);
            }}
          />
          <button
            className="mt-4 w-full bg-primary p-2 rounded-md text-white"
            onClick={() => {
              let temp = [];
              cart.forEach((element) => {
                if (
                  element.ownerEmail + element.title !=
                  product.ownerEmail + product.title
                ) {
                  temp.push(element);
                } else {
                  setCount((prev) => {
                    return (prev = prev - 1);
                  });
                }
              });
              setCart(temp);
              addToCart(product);
            }}
          >
            Add to Cart @ <span>&#8377;</span> {product.price}/kg
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
