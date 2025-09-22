import React from 'react';
import { Heart, ShoppingCart } from 'lucide-react';
import useWishlistStore from '../../store/wishlistStore';
import useCartStore from '../../store/cartStore';
import { toast } from 'react-hot-toast';
import { ProductImage } from '../product/ProductImage';

interface WishlistItemProps {
  item: any;
}

const WishlistItem: React.FC<WishlistItemProps> = ({ item }) => {
  const { removeFromWishlist } = useWishlistStore();
  const { addToCart } = useCartStore();

  const handleAddToCart = async () => {
    try {
      await addToCart(item.product._id);
      await removeFromWishlist(item.product._id);
      toast.success('Added to cart');
    } catch (error) {
      toast.error('Failed to add to cart');
    }
  };

  return (
    <div className="col-md-3 mb-4">
      <div className="card h-100">
        <ProductImage 
          src={item.product.image} 
          alt={item.product.name}
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{item.product.name}</h5>
          <p className="card-text text-muted">${item.product.price.toFixed(2)}</p>
          <div className="mt-auto d-flex gap-2">
            <button 
              className="btn btn-primary flex-grow-1"
              onClick={handleAddToCart}
            >
              <ShoppingCart size={18} className="me-2" />
              Add to Cart
            </button>
            <button 
              className="btn btn-outline-danger"
              onClick={() => removeFromWishlist(item.product._id)}
            >
              <Heart size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishlistItem;