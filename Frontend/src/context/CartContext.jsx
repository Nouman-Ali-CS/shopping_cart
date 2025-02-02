// context/CartContext.js
import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleApiError = (error) => {
    setError(error.message || 'An error occurred');
    setTimeout(() => setError(null), 5000);
  };

  const fetchCart = async (userId) => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:5000/cart?userId=${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch cart');
      }
      const data = await response.json();
      setCart(data.cart.products);
      setTotal(data.total);
    } catch (err) {
      handleApiError(err);
    } finally {
      setLoading(false);
    }
  };

  const cartActions = {
    addToCart: async (userId, productId, quantity) => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5000/cart', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId, productId, quantity })
        });
        if (!response.ok) {
          throw new Error('Failed to add to cart');
        }
        fetchCart(userId);
      } catch (err) {
        handleApiError(err);
      }
    },

    updateQuantity: async (userId, productId, quantity) => {
      if (quantity < 1) return;
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5000/cart/${productId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId, quantity })
        });
        if (!response.ok) {
          throw new Error('Failed to update quantity');
        }
        fetchCart(userId);
      } catch (err) {
        handleApiError(err);
      }
    },

    removeFromCart: async (userId, productId) => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5000/cart/${productId}`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId })
        });
        if (!response.ok) {
          throw new Error('Failed to remove from cart');
        }
        fetchCart(userId);
      } catch (err) {
        handleApiError(err);
      }
    }
  };

  return (
    <CartContext.Provider value={{ cart, total, loading, error, ...cartActions }}>
      {children}
    </CartContext.Provider>
  );
};