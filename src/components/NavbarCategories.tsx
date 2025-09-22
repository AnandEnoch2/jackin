import React from 'react';
import { Link } from 'react-router-dom';
import useCategoryStore from '../store/categoryStore';

const NavbarCategories: React.FC = () => {
  const { categories } = useCategoryStore();

  return (
    <nav className="navbar navbar-categories">
      <div className="container-fluid px-4">
        <ul className="navbar-nav flex-row gap-4">
          <li className="nav-item">
            <Link className="nav-link" to="/">All Categories</Link>
          </li>
          {categories.slice(0, 4).map(category => (
            <li key={category._id} className="nav-item">
              <Link className="nav-link" to={`/category/${category._id}`}>
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default NavbarCategories;