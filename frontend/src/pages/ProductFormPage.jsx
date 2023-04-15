import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, useParams } from "react-router-dom";
import Perks from "../components/Perks";
import PhotosUploader from "../components/PhotosUploader";

const ProductFormPage = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [aqty, setAqty] = useState(0);
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [price, setPrice] = useState(0);
  const [redirect, setRedirect] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/api/userProducts/" + id).then((response) => {
      const { data } = response;
      console.log(data);
      setTitle(data.title);
      setAddedPhotos(data.addedPhotos);
      setDescription(data.description);
      setPerks(data.perks);
      setPrice(data.price);
      setAqty(data.aqty);
      setPrice(data.price);
    });
  }, [id]);
  function inputHeader(text) {
    return <h2 className="text-2xl mt-4">{text}</h2>;
  }
  function inputDescription(text) {
    return <p className="text-gray-500 text-sm">{text}</p>;
  }
  function preInput(header, description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  }

  async function saveProduct(ev) {
    ev.preventDefault();
    const productData = {
      title,
      aqty,
      addedPhotos,
      description,
      perks,
      price,
    };
    await axios.delete("/api/deleteProduct/" + id);
    await axios.post("/api/new", productData);
    setRedirect(true);
  }

  if (redirect) {
    return <Navigate to={"/yourproducts"} />;
  }

  return (
    <div className="max-w-screen-md mx-auto">
      <form onSubmit={saveProduct}>
        {preInput("Title", "Hey! What item you are listing today?")}

        <button
          id="dropdownDefaultButton"
          onClick={() => {
            setDropDown(!dropDown);
          }}
          className="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none  font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center "
          type="button"
        >
          {title ? title : "Select Item"}
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
          className={`h-48 overflow-y-scroll z-10  bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-70 ${
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
                id="Apple"
                name="Title"
                value="Apple"
                className="hidden"
                onChange={(ev) => {
                  setTitle(ev.target.value);
                  setDropDown(!dropDown);
                }}
              />
              <label
                for="Apple"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Apple
              </label>
            </li>
            <li>
              <input
                type="radio"
                id="Banana"
                name="Title"
                value="Banana"
                className="hidden"
                onChange={(ev) => {
                  setTitle(ev.target.value);
                  setDropDown(!dropDown);
                }}
              />
              <label
                for="Banana"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Banana
              </label>
            </li>
            <li>
              <input
                type="radio"
                id="Guava"
                name="Title"
                value="Guava"
                className="hidden"
                onChange={(ev) => {
                  setTitle(ev.target.value);
                  setDropDown(!dropDown);
                }}
              />
              <label
                for="Guava"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Guava
              </label>
            </li>
            <li>
              <input
                type="radio"
                id="Mango"
                name="Title"
                value="Mango"
                className="hidden"
                onChange={(ev) => {
                  setTitle(ev.target.value);
                  setDropDown(!dropDown);
                }}
              />
              <label
                for="Mango"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Mango
              </label>
            </li>
            <li>
              <input
                type="radio"
                id="Rice"
                name="Title"
                value="Rice"
                className="hidden"
                onChange={(ev) => {
                  setTitle(ev.target.value);
                  setDropDown(!dropDown);
                }}
              />
              <label
                for="Rice"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Rice
              </label>
            </li>
            <li>
              <input
                type="radio"
                id="Pulse"
                name="Title"
                value="Pulse"
                className="hidden"
                onChange={(ev) => {
                  setTitle(ev.target.value);
                  setDropDown(!dropDown);
                }}
              />
              <label
                for="Pulse"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Pulse
              </label>
            </li>
            <li>
              <input
                type="radio"
                id="Tomato"
                name="Title"
                value="Tomato"
                className="hidden"
                onChange={(ev) => {
                  setTitle(ev.target.value);
                  setDropDown(!dropDown);
                }}
              />
              <label
                for="Tomato"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Tomato
              </label>
            </li>
            <li>
              <input
                type="radio"
                id="Potato"
                name="Title"
                value="Potato"
                className="hidden"
                onChange={(ev) => {
                  setTitle(ev.target.value);
                  setDropDown(!dropDown);
                }}
              />
              <label
                for="Potato"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Potato
              </label>
            </li>
            <li>
              <input
                type="radio"
                id="Cauliflower"
                name="Title"
                value="Cauliflower"
                className="hidden"
                onChange={(ev) => {
                  setTitle(ev.target.value);
                  setDropDown(!dropDown);
                }}
              />
              <label
                for="Cauliflower"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Cauliflower
              </label>
            </li>
            <li>
              <input
                type="radio"
                id="EggPlant"
                name="Title"
                value="EggPlant"
                className="hidden"
                onChange={(ev) => {
                  setTitle(ev.target.value);
                  setDropDown(!dropDown);
                }}
              />
              <label
                for="EggPlant"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                EggPlant
              </label>
            </li>
          </ul>
        </div>

        {preInput("Photos", "More = Better")}
        <PhotosUploader
          addedPhotos={addedPhotos}
          onChange={setAddedPhotos}
          id={id}
        />
        {preInput("Description", "Add something creative and catchy!")}
        <textarea
          className="w-full border my-1 py-2 px-3 rounded-2xl h-44"
          value={description}
          onChange={(ev) => setDescription(ev.target.value)}
        />
        {preInput("Perks", "Extra perks : Happy Customers")}
        <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <Perks selected={perks} onChange={setPerks} />
        </div>
        {preInput("Price", "Input the Price per Kg of the product")}
        <input
          type="number"
          className="w-full border my-2 py-2 px-3 rounded-2xl"
          value={price}
          onChange={(ev) => setPrice(ev.target.value)}
        />
        {preInput(
          "Available Quantity",
          "Add the available quantity of the product in kgs"
        )}
        <input
          type="number"
          className="w-full border my-4 py-2 px-3 rounded-2xl"
          value={aqty}
          onChange={(ev) => setAqty(ev.target.value)}
        />
        <button className=" bg-primary p-2 w-full text-white rounded-2xl">
          Save
        </button>
      </form>
    </div>
  );
};

export default ProductFormPage;
