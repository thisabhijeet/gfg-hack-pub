import "./App.css";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import Home from "./pages/Home";
import YourProducts from "./pages/YourProducts";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Layout from "./pages/Layout";
import Products from "./pages/Products";
import YourOrders from "./pages/YourOrders";
import Error from "./pages/Error";
import Register from "./pages/Register";
import ProductFormPage from "./pages/ProductFormPage";
import SpecificOrder from "./pages/SpecificOrder";
import { UserContextProvider } from "./context/UserContext";
import { CountContextProvider } from "./context/ItemCount";
import { CartContextProvider } from "./context/CartItems";

function App() {
  axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
  axios.defaults.withCredentials = true;
  return (
    <UserContextProvider>
      <CountContextProvider>
        <CartContextProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="yourproducts" element={<YourProducts />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="cart" element={<Cart />} />
              <Route path="products" element={<Products />} />
              <Route path="yourorders" element={<YourOrders />} />
              <Route path="yourorders/:id" element={<SpecificOrder />} />
              <Route path="new" element={<ProductFormPage />} />
              <Route path="new/:id" element={<ProductFormPage />} />
              <Route path="*" element={<Error />} />
            </Route>
          </Routes>
        </CartContextProvider>
      </CountContextProvider>
    </UserContextProvider>
  );
}

export default App;
