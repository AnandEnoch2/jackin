import express from 'express';
import { auth } from '../middleware/auth.js';
import Wishlist from '../models/Wishlist.js';

const router = express.Router();

// Get wishlist
router.get('/', auth, async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.user._id }).populate('products');
    res.json(wishlist?.products || []);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add to wishlist
router.post('/', auth, async (req, res) => {
  try {
    let wishlist = await Wishlist.findOne({ user: req.user._id });
    if (!wishlist) {
      wishlist = new Wishlist({ user: req.user._id, products: [] });
    }
    
    if (!wishlist.products.includes(req.body.productId)) {
      wishlist.products.push(req.body.productId);
      await wishlist.save();
    }
    
    res.json(wishlist);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Remove from wishlist
router.delete('/:productId', auth, async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.user._id });
    if (wishlist) {
      wishlist.products = wishlist.products.filter(
        product => product.toString() !== req.params.productId
      );
      await wishlist.save();
    }
    res.json(wishlist);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;