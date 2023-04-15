import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { CartContext } from "../context/CartItems";
import { CountContext } from "../context/ItemCount";
const Cart = () => {
  const [pm, setPm] = useState("");
  const [subt, setSubt] = useState(0);
  const [disc, setDisc] = useState(0);
  const [total, setTotal] = useState(0);
  const { cart, setCart } = useContext(CartContext);
  const { setCount } = useContext(CountContext);
  const [dropDown, setDropDown] = useState(false);
  console.log(pm);
  useEffect(() => {
    console.log("yes");
    let sum = 0;
    let d = 0;
    cart.forEach((element) => {
      sum = sum + element.amount;
      if (element.perks.includes("ed")) {
        d = d + 0.1 * element.amount;
      }
    });
    setSubt(sum);
    setDisc(d);
    setTotal(sum - d);
  }, [cart]);
  console.log(cart);
  return (
    <div className="bg-gray-100 h-full max-w-screen-lg mx-auto">
      {cart.length > 0 ? (
        <section>
          <div class="mx-auto px-4 py-8 sm:px-6 sm:py-8 lg:px-8">
            <div class="mx-auto">
              <header class="text-center">
                <h1 class="text-xl font-bold text-primary sm:text-3xl">
                  Your Cart
                </h1>
              </header>

              <div class="mt-8 space-y-8">
                {cart.length > 0 &&
                  cart.map((item) => (
                    <div class="flex items-center gap-4">
                      <div className="w-5/12">
                        <img
                          src={item.addedPhotos[0]}
                          alt=""
                          class="h-48 w-full rounded-sm object-cover"
                        />
                      </div>

                      <div>
                        <h3 class="text-3xl font-semibold text-gray-900">
                          {item.title}
                        </h3>

                        <div class="mt-1 space-y-px text-lg text-gray-600">
                          <div>
                            <div class="inline">
                              {item.description.length > 20
                                ? item.description.substring(0, 20) + "..."
                                : item.description}
                            </div>
                          </div>
                          <div>
                            <div class="inline">Seller: </div>
                            <div class="inline">{item.owner}</div>
                          </div>
                        </div>
                        <div className="mt-2">
                          {`Amount: ${item.amount} @`}
                          <span>&#8377;</span> {item.price}/kg
                        </div>
                      </div>

                      <div class="flex flex-1 items-center justify-end gap-2">
                        <input
                          type="number"
                          defaultValue={item.qty}
                          id={item.ownerEmail + item.title}
                          class="h-8 w-16 rounded border-gray-200 bg-gray-50 p-0 text-center text-xs text-gray-600 border-none mr-4"
                          onChange={(ev) => {
                            let quant = ev.target.value;
                            let temp = [];
                            cart.forEach((element) => {
                              if (
                                element.ownerEmail + element.title ==
                                item.ownerEmail + item.title
                              ) {
                                element.qty = quant;
                                element.amount = quant * item.price;
                              }
                              temp.push(element);
                            });
                            setCart(temp);
                          }}
                        />

                        <button
                          class="text-gray-600 transition hover:text-red-600"
                          onClick={() => {
                            let temp = [];
                            cart.forEach((element) => {
                              if (
                                element.ownerEmail + element.title !=
                                item.ownerEmail + item.title
                              ) {
                                temp.push(element);
                              }
                            });
                            setCount((prev) => {
                              return (prev = prev - 1);
                            });
                            setCart(temp);
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="h-4 w-4"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}

                <div class="mt-8 flex justify-end border-t border-gray-100 pt-8">
                  <div class="w-screen max-w-lg space-y-4">
                    <div class="space-y-0.5 text-sm text-gray-700">
                      <div class="flex justify-between">
                        <div>Subtotal</div>
                        <div>
                          <span>&#8377;</span> {subt}
                        </div>
                      </div>

                      <div class="flex justify-between">
                        <div>Discount</div>
                        <div>
                          - <span>&#8377;</span> {disc}
                        </div>
                      </div>

                      <div class="flex justify-between !text-base font-medium">
                        <div>Total</div>
                        <div>
                          <span>&#8377;</span> {total}
                        </div>
                      </div>
                    </div>

                    <div class="flex justify-end">
                      <span class="inline-flex items-center justify-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-indigo-700">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="-ml-1 mr-1.5 h-4 w-4"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z"
                          />
                        </svg>

                        <p class="whitespace-nowrap text-xs">
                          10% Applied as applicable
                        </p>
                      </span>
                    </div>
                    <button
                      id="dropdownDefaultButton"
                      onClick={() => {
                        setDropDown(!dropDown);
                      }}
                      className="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none  font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center "
                      type="button"
                    >
                      {pm ? pm : "Select Payment Method"}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4 ml-2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                        />
                      </svg>
                    </button>
                    <div
                      id="dropdown"
                      className={`z-10  bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-70 ${
                        dropDown ? "relative" : "hidden"
                      }`}
                    >
                      <ul
                        className="py-2 text-sm text-gray-700 dark:text-gray-200"
                        aria-labelledby="dropdownDefaultButton"
                      >
                        <li>
                          <input
                            type="radio"
                            id="Credit Card"
                            name="Pm"
                            value="Credit Card"
                            className="hidden"
                            onChange={(ev) => {
                              setPm(ev.target.value);
                              setDropDown(!dropDown);
                            }}
                          />
                          <label
                            for="Credit Card"
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Credit Card
                          </label>
                        </li>
                        <li>
                          <input
                            type="radio"
                            id="Debit Card"
                            name="Pm"
                            value="Debit Card"
                            className="hidden"
                            onChange={(ev) => {
                              setPm(ev.target.value);
                              setDropDown(!dropDown);
                            }}
                          />
                          <label
                            for="Debit Card"
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Debit Card
                          </label>
                        </li>
                        <li>
                          <input
                            type="radio"
                            id="Net Banking"
                            name="Pm"
                            value="Net Banking"
                            className="hidden"
                            onChange={(ev) => {
                              setPm(ev.target.value);
                              setDropDown(!dropDown);
                            }}
                          />
                          <label
                            for="Net Banking"
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Net Banking
                          </label>
                        </li>
                        <li>
                          <input
                            type="radio"
                            id="Cash on Delivery"
                            name="Pm"
                            value="Cash on Delivery"
                            className="hidden"
                            onChange={(ev) => {
                              setPm(ev.target.value);
                              setDropDown(!dropDown);
                            }}
                          />
                          <label
                            for="Cash on Delivery"
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Cash on Delivery
                          </label>
                        </li>
                      </ul>
                    </div>
                    <div class="flex justify-end">
                      <button
                        onClick={async (ev) => {
                          ev.preventDefault();
                          const orders = [];
                          const photos = [];
                          cart.forEach((item) => {
                            orders.push(item);
                            item.addedPhotos.forEach((link) => {
                              photos.push(link);
                            });
                          });
                          const order = {};
                          order.time = Date.now();
                          order.id = new Date().getTime();
                          order.cart = orders;
                          order.payment = pm;
                          order.amount = total;
                          order.photos = photos;
                          const postedOrder = await axios.post(
                            "/api/processOrder",
                            order
                          );
                          console.log(postedOrder);
                          setCart([]);
                          setCount(0);
                        }}
                        class="block rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
                      >
                        Checkout
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <div className="p-16 font-extrabold text-center text-primary text-4xl">
          Cart is Empty!
        </div>
      )}
    </div>
  );
};

export default Cart;
