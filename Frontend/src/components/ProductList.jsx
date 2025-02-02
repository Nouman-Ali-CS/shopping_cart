// components/ProductList.js
import React, { useState, useEffect, useContext } from 'react';
import { CartContext } from '../context/CartContext';
import './ProductList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/products');
        if (!response.ok) {
          throw new Error('Failed to load products');
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="product-list-container">
        <h2>Products</h2>
        <div className="loading-skeleton"></div>
        <div className="loading-skeleton"></div>
        <div className="loading-skeleton"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="product-list-container">
        <h2>Products</h2>
        <div className="error-message">{error}</div>
      </div>
    );
  }

  return (
    <div className="product-list-container">
      <h2>Products</h2>
      <div className="products-grid">
        {products.map((product) => (
          <div key={product._id} className="product-card">
            <h3>{product.name}</h3>
            <span className="price">${product.price}</span>
            <p className="description">{product.description}</p>
            <button 
              className="add-to-cart-btn"
              onClick={() => addToCart('user1', product._id, 1)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;