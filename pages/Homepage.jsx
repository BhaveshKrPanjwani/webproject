import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../components/Loader.jsx';
import './Homepage.css';

function Homepage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://fakestoreapi.com/products?limit=4')
      .then(response => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="homepage">
      <section className="banner">
        <h1>Welcome to Our Store</h1>
        <p>Find the best products at unbeatable prices!</p>
      </section>
      <section className="featured-products">
        <h2>Featured Products</h2>
        <div className="product-grid">
          {products.map(product => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.title} />
              <h3>{product.title}</h3>
              <p>${product.price}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Homepage;
