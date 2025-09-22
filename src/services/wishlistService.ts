import axios from 'axios';
import { WishlistItem } from '../types';

const BASE_URL = 'http://localhost:5000/api/wishlist';

export const wishlistService = {
  async getWishlist(): Promise<WishlistItem[]> {
    const response = await axios.get(BASE_URL);
    return response.data;
  },

  async addToWishlist(productId: string): Promise<void> {
    await axios.post(BASE_URL, { productId });
  },

  async removeFromWishlist(productId: string): Promise<void> {
    await axios.delete(`${BASE_URL}/${productId}`);
  }
};