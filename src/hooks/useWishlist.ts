import { useState, useEffect } from 'react';
import { WishlistItem } from '../types';
import { wishlistService } from '../services/wishlistService';
import { toast } from 'react-hot-toast';
import useAuthStore from '../store/authStore';

export const useWishlist = () => {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useAuthStore();

  const fetchWishlist = async () => {
    if (!isAuthenticated) return;
    
    try {
      setLoading(true);
      const data = await wishlistService.getWishlist();
      setItems(data);
    } catch (err) {
      toast.error('Failed to fetch wishlist');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchWishlist();
    }
  }, [isAuthenticated]);

  const addToWishlist = async (productId: string) => {
    try {
      setLoading(true);
      await wishlistService.addToWishlist(productId);
      await fetchWishlist();
      toast.success('Added to wishlist');
    } catch (err) {
      toast.error('Failed to add to wishlist');
    } finally {
      setLoading(false);
    }
  };

  const removeFromWishlist = async (productId: string) => {
    try {
      setLoading(true);
      await wishlistService.removeFromWishlist(productId);
      await fetchWishlist();
      toast.success('Removed from wishlist');
    } catch (err) {
      toast.error('Failed to remove from wishlist');
    } finally {
      setLoading(false);
    }
  };

  return {
    items,
    loading,
    addToWishlist,
    removeFromWishlist,
    fetchWishlist
  };
};