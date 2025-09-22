import { useState, useEffect } from 'react';
import { CartItem } from '../types';
import { cartService } from '../services/cartService';
import { toast } from 'react-hot-toast';
import useAuthStore from '../store/authStore';

export const useCart = () => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const { isAuthenticated } = useAuthStore();

  const fetchCart = async () => {
    if (!isAuthenticated) return;
    
    try {
      setLoading(true);
      const data = await cartService.getCart();
      setItems(data.items);
      setTotal(data.total);
    } catch (err) {
      toast.error('Failed to fetch cart');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
    }
  }, [isAuthenticated]);

  const addToCart = async (productId: string, quantity = 1) => {
    try {
      setLoading(true);
      await cartService.addToCart(productId, quantity);
      await fetchCart();
      toast.success('Added to cart');
    } catch (err) {
      toast.error('Failed to add to cart');
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (productId: string) => {
    try {
      setLoading(true);
      await cartService.removeFromCart(productId);
      await fetchCart();
      toast.success('Removed from cart');
    } catch (err) {
      toast.error('Failed to remove from cart');
    } finally {
      setLoading(false);
    }
  };

  return {
    items,
    loading,
    total,
    addToCart,
    removeFromCart,
    fetchCart
  };
};