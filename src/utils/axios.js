import axios from 'axios';
import { store } from '../store';
import { logout } from '../store/slices/authSlice';

// Create a centralized axios instance
const axiosInstance = axios.create({
  // Base URL from environment or fallback to localhost
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Attach token automatically
axiosInstance.interceptors.request.use(
  (config) => {
    // Get token from Redux store, fallback to localStorage
    const state = store.getState();
    const token = state.auth?.token || localStorage.getItem('token');

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Handle global errors (e.g., 401 Unauthorized)
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Check if error is 401 Unauthorized
    if (error.response && error.response.status === 401) {
      // Dispatch logout action to clear state and local storage
      store.dispatch(logout());
      
      // Prevent infinite redirect loop if already on login page
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    
    // Check if error is 403 Forbidden
    if (error.response && error.response.status === 403) {
      console.error("Access Denied: You do not have permission to perform this action.");
      // Optionally could dispatch a global notification here
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
