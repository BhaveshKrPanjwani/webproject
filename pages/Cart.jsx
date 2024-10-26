import React, { useState, useEffect } from "react";
import "./Cart.css";
import Loader from "../components/Loader";

const Cart = ({ cartItems, removeFromCart }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <h2>Shopping Cart</h2>
      <div className="cart-items">
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.title} />
              <div>
                <h3>{item.title}</h3>
                <p>Price: ${item.price}</p>
                <p>Quantity: {item.quantity}</p>
                <button onClick={() => removeFromCart(item.id)}>Remove</button>
              </div>
            </div>
          ))
        )}
      </div>
      <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
    </div>
  );
};

export default Cart;
