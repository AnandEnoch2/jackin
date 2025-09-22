import express from 'express';
import { isAdmin } from '../../middleware/auth.js';
import { 
  getAllProducts, 
  createProduct, 
  updateProduct, 
  deleteProduct 
} from '../../controllers/productController.js';

const router = express.Router();

// Public routes
router.get('/', getAllProducts);

// Admin routes
router.post('/', isAdmin, createProduct);
router.put('/:id', isAdmin, updateProduct);
router.delete('/:id', isAdmin, deleteProduct);

export default router;