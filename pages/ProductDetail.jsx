import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./ProductDetail.css";
import Loader from "../components/Loader";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="product-detail-container">
      <img src={product.image} alt={product.title} className="product-image" />
      <div className="product-info">
        <h2>{product.title}</h2>
        <p className="product-price">${product.price}</p>
        <p className="product-description">{product.description}</p>
        <p className="product-rating">Rating: {product.rating.rate} ⭐ ({product.rating.count} reviews)</p>
      </div>
    </div>
  );
}

export default ProductDetail;
