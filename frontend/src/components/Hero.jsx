import React from "react";

const Hero = () => {
  return (
    // <div className="max-w-7xl">
      <section className="relative bg-[url(/images/hero.jpg)] bg-cover bg-center bg-no-repeat max-w-screen-2xl mx-auto">
        <div className="absolute inset-0 bg-white/75 sm:bg-transparent sm:bg-gradient-to-t sm:from-white/95 sm:to-white/25"></div>

        <div className="relative mx-auto max-w-screen-xl px-4 py-32 sm:flex sm:h-screen sm:items-center sm:px-8 sm:-mt-16">
          <div className="max-w-xl text-center sm:text-left">
            <h1 className="text-3xl font-extrabold sm:text-5xl">
              Let us find your
              <strong className="block font-extrabold text-primary">
                Forever Marketplace.
              </strong>
            </h1>

            <p className="mt-4 max-w-lg sm:text-xl font-medium">
              Now sellers and buyers will all meet at a single point.
            </p>

            <div className="mt-8 flex flex-wrap gap-4 text-center">
              <a
                href="#"
                className="block w-full rounded bg-primary px-12 py-3 text-sm font-bold text-white shadow hover:bg-[#285e1a] focus:outline-none sm:w-auto"
              >
                Get Started
              </a>

              <a
                href="#"
                className="block w-full rounded bg-white px-12 py-3 text-sm font-bold text-primary shadow hover:text-[#285e1a] focus:outline-none sm:w-auto"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>
    // </div>
  );
};

export default Hero;
