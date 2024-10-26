// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ toggleDarkMode }) => {
  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      <Link to="/products">Product Details</Link>
      <Link to="/cart">Cart</Link>
      <button onClick={toggleDarkMode}>Toggle Dark Mode</button>
    </nav>
  );
};

export default Navbar;
