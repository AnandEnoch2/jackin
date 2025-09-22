import React from 'react';
import { Route } from 'react-router-dom';
import AdminLayout from '../components/layouts/AdminLayout';
import Dashboard from '../pages/admin/Dashboard';
import Products from '../pages/admin/Products';
import Categories from '../pages/admin/Categories';
import Orders from '../pages/admin/Orders';
import Users from '../pages/admin/Users';
import AdminRoute from '../components/AdminRoute';

const AdminRoutes = [
  <Route
    key="admin"
    path="/admin"
    element={
      <AdminRoute>
        <AdminLayout>
          <Dashboard />
        </AdminLayout>
      </AdminRoute>
    }
  />,
  <Route
    key="admin-products"
    path="/admin/products"
    element={
      <AdminRoute>
        <AdminLayout>
          <Products />
        </AdminLayout>
      </AdminRoute>
    }
  />,
  <Route
    key="admin-categories"
    path="/admin/categories"
    element={
      <AdminRoute>
        <AdminLayout>
          <Categories />
        </AdminLayout>
      </AdminRoute>
    }
  />,
  <Route
    key="admin-orders"
    path="/admin/orders"
    element={
      <AdminRoute>
        <AdminLayout>
          <Orders />
        </AdminLayout>
      </AdminRoute>
    }
  />,
  <Route
    key="admin-users"
    path="/admin/users"
    element={
      <AdminRoute>
        <AdminLayout>
          <Users />
        </AdminLayout>
      </AdminRoute>
    }
  />
];

export default AdminRoutes;