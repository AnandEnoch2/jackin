import axios from 'axios';
import { CartItem } from '../types';

const BASE_URL = 'http://localhost:5000/api/cart';

export const cartService = {
  async getCart(): Promise<{ items: CartItem[]; total: number }> {
    const response = await axios.get(BASE_URL);
    return response.data;
  },

  async addToCart(productId: string, quantity: number): Promise<void> {
    await axios.post(BASE_URL, { productId, quantity });
  },

  async updateQuantity(productId: string, quantity: number): Promise<void> {
    await axios.put(`${BASE_URL}/${productId}`, { quantity });
  },

  async removeFromCart(productId: string): Promise<void> {
    await axios.delete(`${BASE_URL}/${productId}`);
  },

  async clearCart(): Promise<void> {
    await axios.delete(BASE_URL);
  }
};