import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
const YourOrders = () => {
  const [allOrders, setAllOrders] = useState([]);
  const { user, ready } = useContext(UserContext);
  // console.log(ready);
  // if (ready) {
  useEffect(() => {
    if (user) {
      axios.get("/api/placedOrders").then(({ data }) => {
        console.log("sent");
        setAllOrders(data);
      });
    }
  }, [user]);
  return (
    <div className="h-full bg-gray-100 max-w-screen-2xl mx-auto pt-8">
        {user && allOrders.length > 0 ? (
          allOrders.map((order) => (
            <Link to={`/yourorders/${order.id}`} key={order.id}>
              <div className="mx-8 border p-4 border-gray-300 rounded-md mt-4">
                <div className="flex flex-col sm:flex-row">
                  <div className="flex-grow">Order ID: {order.id}</div>
                  {/* <div>
                  {new Date().toDateString(order.time)},{" "}
                  {new Date(order.time) +
                    "hrs : " +
                    new Date().getMinutes(order.time) +
                    "mins"}
                </div> */}
                </div>
                <div className="flex flex-col sm:flex-row mt-2">
                  <div className="flex-grow">
                    A total amount of <span>&#8377;</span>
                    {order.amount}
                  </div>
                  <div>Payment Mode: {order.payment}</div>
                </div>
                <div>
                  <div className="flex flex-row overflow-x-scroll h-32 space-x-4 mt-4">
                    {order.photos.map((link) => (
                      <img
                        src={link}
                        alt=""
                        className="object-cover w-32 rounded-md"
                        key={link}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="text-primary text-lg text-center pb-8">
            {
              <Link
                className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full"
                to="/login"
              >
                Please Log In
              </Link>
            }
          </div>
        )}
    </div>
  );
  // } else {
  //   useEffect(() => {}, []);
  //   return <div>Loading</div>;
  // }
};

export default YourOrders;
