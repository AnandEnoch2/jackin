import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { toast } from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  stock: number;
}

interface ProductStore {
  products: Product[];
  loading: boolean;
  error: string | null;
  searchResults: Product[];
  addProduct: (product: Omit<Product, '_id'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  searchProducts: (query: string) => void;
}

const useProductStore = create<ProductStore>()(
  persist(
    (set, get) => ({
      products: [],
      loading: false,
      error: null,
      searchResults: [],

      addProduct: (product) => {
        const newProduct = {
          ...product,
          _id: uuidv4(),
        };
        set((state) => ({
          products: [...state.products, newProduct]
        }));
        toast.success('Product added successfully');
      },

      updateProduct: (id, product) => {
        set((state) => ({
          products: state.products.map((p) =>
            p._id === id ? { ...p, ...product } : p
          )
        }));
        toast.success('Product updated successfully');
      },

      deleteProduct: (id) => {
        set((state) => ({
          products: state.products.filter((p) => p._id !== id)
        }));
        toast.success('Product deleted successfully');
      },

      searchProducts: (query) => {
        const { products } = get();
        const results = products.filter(
          (product) =>
            product.name.toLowerCase().includes(query.toLowerCase()) ||
            product.description.toLowerCase().includes(query.toLowerCase())
        );
        set({ searchResults: results });
      }
    }),
    {
      name: 'product-store'
    }
  )
);

export default useProductStore;