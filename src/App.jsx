// src/App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductListing from "../pages/ProductListing.jsx";
import ProductDetail from "../pages/ProductDetail.jsx"; 
import Cart from "../pages/Cart.jsx"; 
import Homepage from "../pages/Homepage.jsx"; 
import Navbar from "../pages/NAvbar.jsx"; 
import Loader from '../components/Loader'; 
import './App.css';
function App() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false); 

  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedMode);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("darkMode", newMode); 
      return newMode;
    });
  };

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.reduce((acc, item) => {
        if (item.id === productId) {
          if (item.quantity > 1) {
            acc.push({ ...item, quantity: item.quantity - 1 });
          }
        } else {
          acc.push(item);
        }
        return acc;
      }, [])
    );
  };

  const startLoading = () => setLoading(true);
  const stopLoading = () => setLoading(false);

  return (
    <Router>
      <div className={darkMode ? "app dark-mode" : "app"}>
        <Navbar toggleDarkMode={toggleDarkMode} />
        {loading && <Loader />}
        <Routes>
          <Route path="/" element={<Homepage startLoading={startLoading} stopLoading={stopLoading} />} />
          <Route path="/products" element={<ProductListing addToCart={addToCart} startLoading={startLoading} stopLoading={stopLoading} />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart cartItems={cartItems} removeFromCart={removeFromCart} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
