import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Outlet, Link, useLocation } from 'react-router-dom';
import { logout } from '../store/slices/authSlice';

export default function MainLayout() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const navLinks = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Users', path: '/user-management' },
    { name: 'Roles', path: '/role-management' },
    { name: 'Permissions', path: '/permission-management' },
    { name: 'Customers', path: '/customer-management' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <nav className="bg-white shadow border-b border-gray-200 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-8">
          <Link to="/dashboard" className="text-2xl font-bold text-gray-800">Task Manager</Link>
          <div className="hidden md:flex space-x-6">
            {navLinks.map((link) => (
              <Link 
                key={link.path}
                to={link.path} 
                className={`text-sm font-medium transition-colors ${location.pathname.includes(link.path) ? 'text-blue-600 border-b-2 border-blue-600 pb-1' : 'text-gray-600 hover:text-gray-900'}`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-gray-600 font-medium hidden sm:block">Welcome, {user?.name || 'User'}</span>
          <button 
            onClick={handleLogout}
            className="px-4 py-2 text-sm font-medium text-red-600 border border-red-200 rounded hover:bg-red-50 transition-colors"
          >
            Logout
          </button>
        </div>
      </nav>
      <main className="p-8 flex-1 flex flex-col">
        <Outlet />
      </main>
    </div>
  );
}
