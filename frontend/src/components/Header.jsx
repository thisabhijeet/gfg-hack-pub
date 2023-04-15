import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import axios from "axios";
import { CountContext } from "../context/ItemCount";
import { CartContext } from "../context/CartItems";
const Header = () => {
  const [dropdown, setDropdown] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const { count, setCount } = useContext(CountContext);
  const { cart, setCart } = useContext(CartContext);
  async function logout() {
    await axios.post("/api/logout");
    setUser(null);
    setCount(0);
    setCart([]);
  }
  return (
    <div
      className={`max-w-screen-2xl mx-auto sticky top-0 z-30 bg-white ${
        dropdown ? "h-screen" : ""
      }`}
    >
      <header aria-label="Site Header" className="border-b border-gray-100">
        <div className="mx-auto flex h-16 max-w-screen-2xl items-center justify-between sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <button
              type="button"
              className="p-2 lg:hidden"
              onClick={() => {
                setDropdown(!dropdown);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>
          <div className="font-bold text-xl">
            {user && (
              <button className="ml-16 border-none" onClick={logout}>
                <span className="text-primary">Welcome, </span>
                {user.name}!
              </button>
            )}
          </div>
          <div className="flex flex-1 items-center justify-end gap-8">
            <nav
              aria-label="Site Nav"
              className="hidden lg:flex lg:gap-16 lg:text-base lg:uppercase lg:tracking-wide font-bold mr-8"
            >
              <Link
                to="/"
                className="block h-16 border-b-4 border-transparent leading-[4rem] hover:border-primary hover:text-primary"
              >
                HOME
              </Link>

              <Link
                to="/products"
                className="block h-16 border-b-4 border-transparent leading-[4rem] hover:border-primary hover:text-primary"
              >
                PRODUCTS
              </Link>

              <Link
                to="/yourproducts"
                className="block h-16 border-b-4 border-transparent leading-[4rem] hover:border-primary hover:text-primary"
              >
                YOUR PRODUCTS
              </Link>

              <Link
                to="/yourorders"
                className="block h-16 border-b-4 border-transparent leading-[4rem] hover:border-primary hover:text-primary"
              >
                YOUR ORDERS
              </Link>
            </nav>

            <div className="flex items-center">
              <div className="flex items-center divide-x divide-gray-100 border-x border-gray-100">
                <span>
                  <Link
                    to="/cart"
                    className="block border-b-4 border-transparent p-5 hover:border-primary"
                  >
                    <div className="relative">
                      <div className="absolute bg-[#F7DB6A]  -top-3 -right-3.5 rounded-full h-6 w-6 text-center">
                        {count}
                      </div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                        />
                      </svg>
                    </div>
                  </Link>
                </span>

                <span>
                  <Link
                    to="/login"
                    className="block border-b-4 border-transparent p-5 hover:border-primary"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                      />
                    </svg>
                  </Link>
                </span>

                <span className="hidden sm:block">
                  <button className="block border-b-4 border-transparent p-5 hover:border-primary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                      />
                    </svg>
                  </button>
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>
      {dropdown && (
        <div className="mt-12 flex flex-col space-y-12 items-center ">
          <Link
            to="/"
            className="text-3xl"
            onClick={() => {
              setDropdown(!dropdown);
            }}
          >
            HOME
          </Link>
          <div className="border w-full border-gray-100"></div>
          <Link
            to="/products"
            className="text-3xl"
            onClick={() => {
              setDropdown(!dropdown);
            }}
          >
            PRODUCTS
          </Link>
          <div className="border w-full border-gray-100"></div>
          <Link
            to="/yourproducts"
            className="text-3xl"
            onClick={() => {
              setDropdown(!dropdown);
            }}
          >
            YOUR PRODUCTS
          </Link>
          <div className="border w-full border-gray-100"></div>
          <Link
            to="/yourorders"
            className="text-3xl"
            onClick={() => {
              setDropdown(!dropdown);
            }}
          >
            YOUR ORDERS
          </Link>
          <div className="border w-full border-gray-100"></div>
        </div>
      )}
    </div>
  );
};

export default Header;
