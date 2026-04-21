import axiosInstance from './axios';

export const login = async (credentials) => {
  const response = await axiosInstance.post('/consumer/login', credentials);
  return response.data;
};

export const register = async (userData) => {
  const response = await axiosInstance.post('/consumer/register', userData);
  return response.data;
};
