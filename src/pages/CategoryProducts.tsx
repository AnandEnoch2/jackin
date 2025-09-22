import React from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import useCategoryStore from '../store/categoryStore';
import useProductStore from '../store/productStore';

const CategoryProducts: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { categories } = useCategoryStore();
  const { products } = useProductStore();
  
  const category = categories.find(c => c._id === id);
  const categoryProducts = products.filter(p => p.category === category?.name);

  if (!category) {
    return (
      <div className="container py-5">
        <div className="alert alert-warning">Category not found</div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h2 className="mb-4">{category.name}</h2>
      <div className="row">
        {categoryProducts.length > 0 ? (
          categoryProducts.map(product => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <div className="col-12">
            <div className="alert alert-info">
              No products found in this category
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryProducts;