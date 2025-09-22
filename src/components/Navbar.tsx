import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, User, Heart, LogOut } from 'lucide-react';
import SearchBox from './SearchBox';
import NavbarCategories from './NavbarCategories';
import useAuthStore from '../store/authStore';

const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuthStore();

  useEffect(() => {
    // Initialize Bootstrap dropdown
    const dropdownElementList = document.querySelectorAll('.dropdown-toggle');
    dropdownElementList.forEach(dropdownToggle => {
      new window.bootstrap.Dropdown(dropdownToggle);
    });
  }, []);

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <nav className="navbar navbar-main navbar-expand-lg">
        <div className="container-fluid px-4">
          <Link className="navbar-brand me-4" to="/">FreshMart</Link>
          <SearchBox />
          <div className="nav-icons d-flex align-items-center gap-3 ms-auto">
            <Link to="/wishlist" className="nav-icon-link">
              <Heart size={22} />
              <span>Wishlist</span>
            </Link>
            <Link to="/cart" className="nav-icon-link">
              <ShoppingCart size={22} />
              <span>Cart</span>
            </Link>
            {isAuthenticated ? (
              <div className="dropdown">
                <button 
                  className="btn nav-icon-link dropdown-toggle"
                  type="button"
                  id="profileDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <User size={22} />
                  <span>{user?.name}</span>
                </button>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="profileDropdown">
                  {user?.isAdmin && (
                    <li>
                      <Link to="/admin" className="dropdown-item">Admin Dashboard</Link>
                    </li>
                  )}
                  <li>
                    <Link to="/profile" className="dropdown-item">Profile</Link>
                  </li>
                  <li>
                    <Link to="/orders" className="dropdown-item">Orders</Link>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <button onClick={handleLogout} className="dropdown-item text-danger">
                      <LogOut size={18} className="me-2" />
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/login" className="nav-icon-link">
                <User size={22} />
                <span>Login</span>
              </Link>
            )}
          </div>
        </div>
      </nav>
      <NavbarCategories />
    </>
  );
};

export default Navbar;