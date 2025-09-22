import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import useOrderStore from '../store/orderStore';
import UserInfo from '../components/profile/UserInfo';
import OrderHistory from '../components/profile/OrderHistory';

const Profile: React.FC = () => {
  const { user } = useAuthStore();
  const { orders } = useOrderStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  const userOrders = orders.filter(order => order.user._id === user._id);

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-md-4 mb-4">
          <UserInfo user={user} />
        </div>
        <div className="col-md-8">
          <OrderHistory orders={userOrders} />
        </div>
      </div>
    </div>
  );
};

export default Profile;