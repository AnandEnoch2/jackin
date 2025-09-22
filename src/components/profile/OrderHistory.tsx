import React from 'react';
import { Package } from 'lucide-react';
import { Order } from '../../types';
import OrderCard from './OrderCard';

interface OrderHistoryProps {
  orders: Order[];
}

const OrderHistory: React.FC<OrderHistoryProps> = ({ orders }) => {
  if (orders.length === 0) {
    return (
      <div className="text-center py-4">
        <Package size={48} className="text-muted mb-3" />
        <h6>No orders yet</h6>
        <p className="text-muted">Your order history will appear here</p>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title mb-4">Order History</h5>
        {orders.map((order) => (
          <OrderCard key={order._id} order={order} />
        ))}
      </div>
    </div>
  );
};

export default OrderHistory;