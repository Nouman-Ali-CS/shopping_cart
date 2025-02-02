// components/Cart.js
import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import './Cart.css';

const Cart = () => {
  const { cart, total, loading, error, updateQuantity, removeFromCart } = useContext(CartContext);

  if (loading) {
    return (
      <div className="cart-container">
        <h2>Shopping Cart</h2>
        <div className="loading-skeleton"></div>
        <div className="loading-skeleton"></div>
        <div className="loading-skeleton"></div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      {error && <div className="error-message">{error}</div>}
      {cart.length === 0 ? (
        <p className="empty-cart">Your cart is empty</p>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((item) => (
              <div key={item.productId._id} className="cart-item">
                <div className="item-details">
                  <h3>{item.productId.name}</h3>
                  <p className="item-price">${item.productId.price} × {item.quantity}</p>
                </div>
                <div className="item-actions">
                  <button 
                    className="quantity-btn"
                    onClick={() => updateQuantity('user1', item.productId._id, item.quantity - 1)}
                  >
                    -
                  </button>
                  <span className="quantity">{item.quantity}</span>
                  <button 
                    className="quantity-btn"
                    onClick={() => updateQuantity('user1', item.productId._id, item.quantity + 1)}
                  >
                    +
                  </button>
                  <button 
                    className="remove-btn"
                    onClick={() => removeFromCart('user1', item.productId._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-total">
            <h3>Total: ${total}</h3>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;