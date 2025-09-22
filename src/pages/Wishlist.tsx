import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import WishlistItem from '../components/wishlist/WishlistItem';
import EmptyWishlist from '../components/wishlist/EmptyWishlist';
import LoginPrompt from '../components/common/LoginPrompt';
import useWishlistStore from '../store/wishlistStore';
import useAuthStore from '../store/authStore';

const Wishlist: React.FC = () => {
  const { items } = useWishlistStore();
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <LoginPrompt message="Please login to view your wishlist" />;
  }

  if (items.length === 0) {
    return <EmptyWishlist />;
  }

  return (
    <div className="container py-5">
      <h2 className="mb-4">My Wishlist</h2>
      <div className="row">
        {items.map((item) => (
          <WishlistItem key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Wishlist;