import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { toast } from 'react-hot-toast';
import useProductStore from './productStore';

interface CartItem {
  product: any;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  loading: boolean;
  total: number;
  addToCart: (productId: string, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  fetchCart: () => void;
  clearCart: () => void;
  calculateTotal: () => number;
}

const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      loading: false,
      total: 0,

      addToCart: (productId, quantity = 1) => {
        set((state) => {
          const existingItem = state.items.find(item => item.product._id === productId);
          const productStore = useProductStore.getState();
          const product = productStore.products.find(p => p._id === productId);

          if (!product) {
            toast.error('Product not found');
            return state;
          }

          if (existingItem) {
            return {
              items: state.items.map(item =>
                item.product._id === productId
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              )
            };
          }

          return {
            items: [...state.items, { product, quantity }]
          };
        });
        toast.success('Added to cart');
      },

      removeFromCart: (productId) => {
        set((state) => ({
          items: state.items.filter(item => item.product._id !== productId)
        }));
        toast.success('Removed from cart');
      },

      updateQuantity: (productId, quantity) => {
        if (quantity < 1) return;
        set((state) => ({
          items: state.items.map(item =>
            item.product._id === productId
              ? { ...item, quantity }
              : item
          )
        }));
      },

      fetchCart: () => {
        // Cart is already persisted, no need to fetch
      },

      clearCart: () => {
        set({ items: [] });
        toast.success('Cart cleared');
      },

      calculateTotal: () => {
        const { items } = get();
        return items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
      }
    }),
    {
      name: 'cart-store'
    }
  )
);

export default useCartStore;