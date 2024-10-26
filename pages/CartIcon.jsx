import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CartIcon.css';

const CartIcon = ({ itemCount }) => {
  const navigate = useNavigate();

  return (
    <div className="cart-icon" onClick={() => navigate('/cart')} style={{ cursor: 'pointer' }}>
      <i className="fas fa-shopping-cart"></i>
      <span className="item-count">{itemCount}</span>
    </div>
  );
};

export default CartIcon;
