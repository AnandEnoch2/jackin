import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { toast } from 'react-hot-toast';
import useProductStore from './productStore';

interface OrderItem {
  product: {
    _id: string;
    name: string;
    price: number;
  };
  quantity: number;
  price: number;
}

interface Order {
  _id: string;
  user: {
    _id: string;
    name: string;
    email: string;
  };
  items: OrderItem[];
  totalAmount: number;
  status: 'processing' | 'shipped' | 'delivered';
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  paymentMethod: string;
  createdAt: string;
  processingTime?: string;
  deliveryTime?: string;
}

interface OrderStore {
  orders: Order[];
  addOrder: (orderData: Omit<Order, '_id'>) => void;
  updateOrderStatus: (id: string, status: Order['status'], timestamp: string) => void;
}

const useOrderStore = create<OrderStore>()(
  persist(
    (set) => ({
      orders: [],

      addOrder: (orderData) => {
        const productStore = useProductStore.getState();
        
        // Update product stock
        orderData.items.forEach((item) => {
          const product = productStore.products.find(p => p._id === item.product._id);
          if (product) {
            productStore.updateProduct(product._id, {
              stock: product.stock - item.quantity
            });
          }
        });

        const newOrder = {
          ...orderData,
          _id: `order_${Date.now()}`,
        };
        
        set((state) => ({
          orders: [newOrder, ...state.orders],
        }));
      },

      updateOrderStatus: (id, status, timestamp) => {
        set((state) => ({
          orders: state.orders.map((order) =>
            order._id === id ? {
              ...order,
              status,
              ...(status === 'shipped' && { processingTime: timestamp }),
              ...(status === 'delivered' && { deliveryTime: timestamp })
            } : order
          ),
        }));
      },
    }),
    {
      name: 'order-store',
    }
  )
);

export default useOrderStore;