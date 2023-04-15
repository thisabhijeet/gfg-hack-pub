import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SpecificOrder = () => {
  const { id } = useParams();
  const [order, setOrder] = useState({});
  useEffect(() => {
    axios.get("/api/placedOrders/" + id).then(({ data }) => {
      setOrder(data);
      console.log(data);
    });
  }, []);
  return (
    <div className="bg-gray-100 h-full max-w-screen-lg mx-auto space-y-8 p-8">
      <div className="mx-8 border p-4 border-gray-300 rounded-md">
        <div className="flex flex-col sm:flex-row">
          <div className="flex-grow">Order ID: {order.id}</div>
          {/* <div>
              {new Date().toDateString(order.time)},{" "}
              {new Date().getHours(order.time) +
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
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {Object.keys(order).length > 0 &&
          order.cart.map((item) => (
            <div
              class="border border-gray-200 p-2"
              key={item.ownerEmail + item.title}
            >
              <img
                src={item.addedPhotos[0]}
                alt=""
                class="h-48 w-full rounded-sm object-contain"
              />

              <div>
                <h3 class="text-2xl font-semibold text-gray-900">
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
            </div>
          ))}
      </div>
    </div>
  );
};

export default SpecificOrder;
