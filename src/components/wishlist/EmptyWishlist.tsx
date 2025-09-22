import React from 'react';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const EmptyWishlist: React.FC = () => (
  <div className="container py-5 text-center">
    <Heart size={48} className="mb-3" />
    <h3>Your wishlist is empty</h3>
    <Link to="/" className="btn btn-primary mt-3">Continue Shopping</Link>
  </div>
);

export default EmptyWishlist;