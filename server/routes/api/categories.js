import express from 'express';
import { isAdmin } from '../../middleware/auth.js';
import { 
  getAllCategories, 
  createCategory, 
  updateCategory, 
  deleteCategory 
} from '../../controllers/categoryController.js';

const router = express.Router();

// Public routes
router.get('/', getAllCategories);

// Admin routes
router.post('/', isAdmin, createCategory);
router.put('/:id', isAdmin, updateCategory);
router.delete('/:id', isAdmin, deleteCategory);

export default router;