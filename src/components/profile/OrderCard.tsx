import React from 'react';
import { Package } from 'lucide-react';
import { Order } from '../../types';

interface OrderCardProps {
  order: Order;
}

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h6 className="mb-1">Order #{order._id.slice(-6)}</h6>
            <p className="text-muted mb-0">
              {new Date(order.createdAt).toLocaleDateString()}
            </p>
          </div>
          <div className="text-end">
            <h6 className="mb-1">${order.totalAmount.toFixed(2)}</h6>
            <span className={`badge ${
              order.status === 'delivered' ? 'bg-success' :
              order.status === 'shipped' ? 'bg-info' :
              'bg-warning'
            }`}>
              {order.status}
            </span>
          </div>
        </div>
        <hr />
        <div className="row">
          {order.items.map((item, index) => (
            <div key={index} className="col-md-6 mb-2">
              <div className="d-flex align-items-center">
                <Package size={18} className="me-2 text-muted" />
                <span>{item.product.name} × {item.quantity}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderCard;