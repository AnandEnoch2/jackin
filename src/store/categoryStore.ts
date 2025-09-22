import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Category {
  _id: string;
  name: string;
  image: string;
}

interface CategoryStore {
  categories: Category[];
  loading: boolean;
  error: string | null;
  addCategory: (category: Omit<Category, '_id'>) => void;
  updateCategory: (id: string, category: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
}

const useCategoryStore = create<CategoryStore>()(
  persist(
    (set) => ({
      categories: [],
      loading: false,
      error: null,

      addCategory: (category) => {
        const newCategory = {
          ...category,
          _id: `cat_${Date.now()}`,
        };
        set((state) => ({
          categories: [...state.categories, newCategory],
        }));
      },

      updateCategory: (id, updatedCategory) => {
        set((state) => ({
          categories: state.categories.map((category) =>
            category._id === id ? { ...category, ...updatedCategory } : category
          ),
        }));
      },

      deleteCategory: (id) => {
        set((state) => ({
          categories: state.categories.filter((category) => category._id !== id),
        }));
      },
    }),
    {
      name: 'category-store',
    }
  )
);

export default useCategoryStore;