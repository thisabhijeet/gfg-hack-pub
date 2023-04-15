import React from "react";
import { Link } from "react-router-dom";

const HomeCTA = () => {
  return (
    <div className="max-w-screen-2xl mx-auto">
      <section className="overflow-hidden bg-gray-50 sm:flex sm:flex-row-reverse">
        <img
          alt="Student"
          src="/images/2.jpg"
          className="h-28 w-1/2 object-cover sm:h-full"
        />
        <div className="p-8 md:p-12 lg:px-16 lg:py-24">
          <div className="mx-auto max-w-xl text-center sm:text-left">
            <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
              So what are you waiting for! Signup today and get started!!
            </h2>

            <div className="mt-4 md:mt-8">
              <Link
                to="/register"
                className="inline-block rounded bg-primary px-12 py-3 text-sm font-medium text-white transition hover:bg-secondary focus:outline-none focus:ring focus:ring-yellow-400"
              >
                Get Started Today
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="overflow-hidden bg-gray-50 sm:grid sm:grid-cols-2">
        <img
          alt="Student"
          src="/images/1.png"
          className="h-56 w-full object-cover sm:h-full"
        />
        <div className="p-8 md:p-12 lg:px-16 lg:py-24">
          <div className="mx-auto max-w-xl text-center sm:text-left">
            <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
              We also plan to get high end analytics and services for you in
              future!
            </h2>

            <div className="mt-4 md:mt-8">
              <Link
                to="/products"
                className="inline-block rounded bg-primary px-12 py-3 text-sm font-medium text-white transition hover:bg-secondary focus:outline-none focus:ring focus:ring-yellow-400"
              >
                Browse Products
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeCTA;
