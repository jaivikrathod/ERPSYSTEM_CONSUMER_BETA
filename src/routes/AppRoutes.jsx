import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import ProtectedRoute from './ProtectedRoute';
import MainLayout from '../components/MainLayout';
import UserManagement from '../pages/UserManagement';
import RoleManagement from '../pages/RoleManagement';
import PermissionManagement from '../pages/PermissionManagement';
import CustomerManagement from '../pages/CustomerManagement';
import LandingPage from '../pages/LandingPage';
import RegisterCompanyPage from '../pages/Registercompany ';

export default function AppRoutes() {
  return (
    <Routes>
      {/* <Route path="/" element={<Navigate to="/dashboard" replace />} /> */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<RegisterCompanyPage />} />
      
      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/user-management" element={<UserManagement />} />
          <Route path="/role-management" element={<RoleManagement />} />
          <Route path="/permission-management" element={<PermissionManagement />} />
          <Route path="/customer-management" element={<CustomerManagement />} />
          {/* Add more protected routes here */}
        </Route>
      </Route>
    </Routes>
  );
}
