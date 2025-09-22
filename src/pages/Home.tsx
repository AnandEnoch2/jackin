import React from 'react';
import CategoryCard from '../components/category/CategoryCard';
import useCategoryStore from '../store/categoryStore';

const Home: React.FC = () => {
  const { categories } = useCategoryStore();

  return (
    <div className="container py-5">
      <h1 className="text-center mb-5 fade-in">Welcome to FreshMart</h1>
      <div className="row">
        {categories.map((category) => (
          <CategoryCard key={category._id} category={category} />
        ))}
      </div>
    </div>
  );
};

export default Home;