import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Trash2 } from 'lucide-react';
import useCartStore from '../store/cartStore';
import useAuthStore from '../store/authStore';
import { toast } from 'react-hot-toast';

const Cart: React.FC = () => {
  const { items = [], loading, fetchCart, removeFromCart, updateQuantity, calculateTotal } = useCartStore();
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
    }
  }, [isAuthenticated, fetchCart]);

  const handleCheckout = () => {
    if (!isAuthenticated) {
      toast.error('Please login to checkout');
      navigate('/login');
      return;
    }

    if (items.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    // Check if all items are in stock
    const outOfStockItems = items.filter(item => item.quantity > item.product.stock);
    if (outOfStockItems.length > 0) {
      toast.error('Some items are out of stock');
      return;
    }

    // Navigate to checkout page
    navigate('/checkout');
  };

  if (!isAuthenticated) {
    return (
      <div className="container py-5 text-center">
        <h2>Please login to view your cart</h2>
        <Link to="/login" className="btn btn-primary mt-3">Login</Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container py-5">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (!items || items.length === 0) {
    return (
      <div className="container py-5 text-center">
        <ShoppingBag size={48} className="mb-3" />
        <h3>Your cart is empty</h3>
        <Link to="/" className="btn btn-primary mt-3">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h2 className="mb-4">Shopping Cart</h2>
      <div className="row">
        <div className="col-md-8">
          {items.map((item) => (
            <div key={item.product._id} className="card mb-3">
              <div className="card-body">
                <div className="row align-items-center">
                  <div className="col-md-2">
                    <img src={item.product.image} alt={item.product.name} className="img-fluid rounded" />
                  </div>
                  <div className="col-md-4">
                    <h5 className="card-title">{item.product.name}</h5>
                    <p className="card-text text-muted">${item.product.price}</p>
                    {item.quantity > item.product.stock && (
                      <p className="text-danger">Out of stock!</p>
                    )}
                  </div>
                  <div className="col-md-3">
                    <div className="input-group">
                      <button 
                        className="btn btn-outline-secondary" 
                        onClick={() => updateQuantity(item.product._id, Math.max(1, item.quantity - 1))}
                        disabled={item.quantity <= 1}
                      >-</button>
                      <input 
                        type="number" 
                        className="form-control text-center" 
                        value={item.quantity}
                        readOnly
                      />
                      <button 
                        className="btn btn-outline-secondary"
                        onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                        disabled={item.quantity >= item.product.stock}
                      >+</button>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <p className="h5 mb-0">${(item.product.price * item.quantity).toFixed(2)}</p>
                  </div>
                  <div className="col-md-1">
                    <button 
                      className="btn btn-link text-danger"
                      onClick={() => removeFromCart(item.product._id)}
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title mb-4">Order Summary</h5>
              <div className="d-flex justify-content-between mb-3">
                <span>Subtotal</span>
                <span>${calculateTotal().toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between mb-4">
                <strong>Total</strong>
                <strong>${calculateTotal().toFixed(2)}</strong>
              </div>
              <button 
                onClick={handleCheckout}
                className="btn btn-primary w-100"
                disabled={items.length === 0 || items.some(item => item.quantity > item.product.stock)}
              >
                Proceed to Checkout
              </button>
              {items.some(item => item.quantity > item.product.stock) && (
                <p className="text-danger mt-2 small">Some items are out of stock</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;