import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => {
      const costNum = parseFloat(item.cost.replace('$', ''));
      return total + costNum * item.quantity;
    }, 0).toFixed(2);
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem({ name: item.name }));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem({ name: item.name }));
  };

  const calculateTotalCost = (item) => {
    const costNum = parseFloat(item.cost.replace('$', ''));
    return (costNum * item.quantity).toFixed(2);
  };

  const handleCheckoutShopping = () => {
    alert('Coming Soon! Thank you for your interest.');
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center', color: '#2e7d32' }}>Shopping Cart</h2>
      <h3 style={{ textAlign: 'center' }}>Total Cart Amount: ${calculateTotalAmount()}</h3>

      {cart.length === 0 ? (
        <p style={{ textAlign: 'center', marginTop: '30px' }}>Your cart is currently empty.</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #ddd', padding: '15px 0' }}>
              <img src={item.image} alt={item.name} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '6px' }} />
              <div style={{ flex: 1, marginLeft: '20px' }}>
                <h4 style={{ margin: '0 0 5px' }}>{item.name}</h4>
                <p style={{ margin: '0', color: '#555' }}>Unit Price: {item.cost}</p>
                <p style={{ margin: '5px 0 0', fontWeight: 'bold' }}>Subtotal: ${calculateTotalCost(item)}</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <button onClick={() => handleDecrement(item)} style={{ padding: '5px 10px', fontSize: '16px', cursor: 'pointer' }}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => handleIncrement(item)} style={{ padding: '5px 10px', fontSize: '16px', cursor: 'pointer' }}>+</button>
              </div>
              <button onClick={() => handleRemove(item)} style={{ marginLeft: '20px', backgroundColor: '#e53935', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '4px', cursor: 'pointer' }}>
                Delete
              </button>
            </div>
          ))}
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px' }}>
        <button onClick={onContinueShopping} style={{ backgroundColor: '#2e7d32', color: 'white', border: 'none', padding: '12px 20px', borderRadius: '4px', cursor: 'pointer', fontSize: '16px' }}>
          Continue Shopping
        </button>
        <button onClick={handleCheckoutShopping} style={{ backgroundColor: '#ff9800', color: 'white', border: 'none', padding: '12px 20px', borderRadius: '4px', cursor: 'pointer', fontSize: '16px' }}>
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartItem;
