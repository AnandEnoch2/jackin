import React from 'react';
import { ShoppingCart, Heart, Tag } from 'lucide-react';
import { Product } from '../types';
import useCartStore from '../store/cartStore';
import useWishlistStore from '../store/wishlistStore';
import useAuthStore from '../store/authStore';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { formatCurrency } from '../utils/formatCurrency';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCartStore();
  const { addToWishlist, removeFromWishlist, items: wishlistItems } = useWishlistStore();
  const { isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  const isInWishlist = wishlistItems.some(item => item.product._id === product._id);
  const isOutOfStock = product.stock === 0;

  // Calculate discount
  const discount = product.discount || 0;
  const discountedPrice = discount > 0 ? product.price * (1 - discount / 100) : product.price;
  const hasDiscount = discount > 0;

  const handleAddToCart = () => {
    if (isOutOfStock) {
      toast.error('Product is out of stock');
      return;
    }

    if (!isAuthenticated) {
      toast.error('Please login to add items to cart');
      navigate('/login');
      return;
    }

    addToCart(product._id);
  };

  const handleWishlistToggle = () => {
    if (!isAuthenticated) {
      toast.error('Please login to manage wishlist');
      navigate('/login');
      return;
    }

    if (isInWishlist) {
      removeFromWishlist(product._id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div className="col-md-3 mb-4">
      <div className="card product-card h-100">
        <div className="position-relative">
          <img 
            src={product.image} 
            className="card-img-top" 
            alt={product.name} 
            style={{ height: '200px', objectFit: 'cover' }} 
          />
          <button 
            className={`btn position-absolute top-0 end-0 m-2 ${isInWishlist ? 'text-danger' : ''}`}
            style={{ 
              background: 'white', 
              borderRadius: '50%', 
              width: '35px', 
              height: '35px', 
              padding: '0'
            }}
            onClick={handleWishlistToggle}
          >
            <Heart 
              size={18} 
              fill={isInWishlist ? 'currentColor' : 'none'}
            />
          </button>
          {hasDiscount && (
            <div className="position-absolute top-0 start-0 m-2 bg-success text-white px-2 py-1 rounded-pill d-flex align-items-center">
              <Tag size={14} className="me-1" />
              {discount}% OFF
            </div>
          )}
        </div>
        <div className="card-body d-flex flex-column">
          <h6 className="card-title text-truncate">{product.name}</h6>
          <p className="card-text small text-muted mb-2">{product.description}</p>
          <div className="mb-2">
            <span className={`badge ${
              product.quality === 'Premium' ? 'bg-success' :
              product.quality === 'Standard' ? 'bg-primary' :
              'bg-secondary'
            }`}>
              {product.quality}
            </span>
          </div>
          <div className="mt-auto">
            <p className="product-price mb-2">
              {hasDiscount ? (
                <>
                  <span className="text-decoration-line-through text-muted me-2" style={{ fontSize: '0.9em' }}>
                    {formatCurrency(product.price)}
                  </span>
                  <span className="text-danger fw-bold">
                    {formatCurrency(discountedPrice)}
                  </span>
                  {product.quantityType && ` / ${product.quantityType}`}
                </>
              ) : (
                <>
                  {formatCurrency(product.price)}
                  {product.quantityType && ` / ${product.quantityType}`}
                </>
              )}
            </p>
            <button 
              onClick={handleAddToCart}
              className={`btn ${isOutOfStock ? 'btn-secondary' : 'btn-add-cart'} w-100 d-flex align-items-center justify-content-center gap-2`}
              disabled={isOutOfStock}
            >
              <ShoppingCart size={18} />
              {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;