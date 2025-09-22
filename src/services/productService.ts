import axios from 'axios';
import { Product } from '../types';

const BASE_URL = 'http://localhost:5000/api/products';

export const productService = {
  async getAllProducts(): Promise<Product[]> {
    const response = await axios.get(BASE_URL);
    return response.data;
  },

  async getProductById(id: string): Promise<Product> {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
  },

  async createProduct(product: Omit<Product, '_id'>): Promise<Product> {
    const response = await axios.post(BASE_URL, product);
    return response.data;
  },

  async updateProduct(id: string, product: Partial<Product>): Promise<Product> {
    const response = await axios.put(`${BASE_URL}/${id}`, product);
    return response.data;
  },

  async deleteProduct(id: string): Promise<void> {
    await axios.delete(`${BASE_URL}/${id}`);
  },

  async searchProducts(query: string): Promise<Product[]> {
    const response = await axios.get(`${BASE_URL}/search?q=${query}`);
    return response.data;
  }
};