import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Login from "./components/Login";
import "antd-css-utilities/utility.min.css";
import ProductListing from "./components/ProductListing";
import { Routes, Route } from "react-router-dom";
import SingleProduct from "./components/SingleProduct";
import Title from "antd/es/typography/Title";
import { Divider } from "antd";
import { NavLink } from "react-router-dom";
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import Register from "./components/Register";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const token = localStorage.getItem("token");

  if (!token) {
    return (
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <ToastContainer />
      </div>
    );
  } else {
    return (
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<ProductListing />} />
          <Route path="/listing" element={<ProductListing />} />
          <Route path="/add-update-product" element={<SingleProduct />} />
          <Route path="/add-update-product/:id" element={<SingleProduct />} />
        </Routes>
        <ToastContainer />
      </div>
    );
  }
}

export default App;
