import React from 'react';
import { Link } from 'react-router-dom';
import { Category } from '../../types';

interface CategoryCardProps {
  category: Category;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  return (
    <div className="col-md-4 mb-4 fade-in">
      <Link to={`/category/${category._id}`} className="text-decoration-none">
        <div className="card h-100 category-card">
          <div className="position-relative">
            <img 
              src={category.image} 
              className="card-img-top" 
              alt={category.name} 
              style={{ height: '200px', objectFit: 'cover' }} 
            />
            <div className="position-absolute bottom-0 start-0 w-100 p-2" 
                 style={{ background: 'linear-gradient(transparent, rgba(0,0,0,0.7))' }}>
              <h5 className="card-title text-white text-center mb-0">{category.name}</h5>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CategoryCard;