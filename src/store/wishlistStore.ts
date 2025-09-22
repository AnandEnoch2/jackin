import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { toast } from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';

interface WishlistItem {
  _id: string;
  product: any;
}

interface WishlistStore {
  items: WishlistItem[];
  loading: boolean;
  addToWishlist: (product: any) => void;
  removeFromWishlist: (productId: string) => void;
  clearWishlist: () => void;
}

const useWishlistStore = create<WishlistStore>()(
  persist(
    (set) => ({
      items: [],
      loading: false,

      addToWishlist: (product) => {
        set((state) => {
          const exists = state.items.some(item => item.product._id === product._id);
          if (exists) {
            toast.error('Product already in wishlist');
            return state;
          }
          toast.success('Added to wishlist');
          return {
            items: [...state.items, { _id: uuidv4(), product }]
          };
        });
      },

      removeFromWishlist: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.product._id !== productId)
        }));
        toast.success('Removed from wishlist');
      },

      clearWishlist: () => {
        set({ items: [] });
        toast.success('Wishlist cleared');
      }
    }),
    {
      name: 'wishlist-store'
    }
  )
);

export default useWishlistStore;