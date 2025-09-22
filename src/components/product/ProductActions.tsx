import React from 'react';
import { ShoppingCart, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import useAuthStore from '../../store/authStore';
import useCartStore from '../../store/cartStore';
import useWishlistStore from '../../store/wishlistStore';

interface ProductActionsProps {
  productId: string;
  isInWishlist: boolean;
  onAddToCart: () => void;
  onWishlistToggle: () => void;
}

export const ProductActions: React.FC<ProductActionsProps> = ({
  productId,
  isInWishlist,
  onAddToCart,
  onWishlistToggle,
}) => {
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  const handleAction = (action: () => void) => {
    if (!isAuthenticated) {
      toast.error('Please login first');
      navigate('/login');
      return;
    }
    action();
  };

  return (
    <div className="d-flex gap-2">
      <button 
        className="btn btn-add-cart flex-grow-1"
        onClick={() => handleAction(onAddToCart)}
      >
        <ShoppingCart size={18} className="me-2" />
        Add to Cart
      </button>
      <button 
        className={`btn ${isInWishlist ? 'btn-danger' : 'btn-outline-danger'}`}
        onClick={() => handleAction(onWishlistToggle)}
      >
        <Heart size={18} fill={isInWishlist ? 'currentColor' : 'none'} />
      </button>
    </div>
  );
};