import api from '../utils/axios';

export const authAPI = {
  login: (credentials) => api.post('/api/auth/login', credentials), // Changed to ERP Auth
  register: (userData) => api.post('/consumer/register', userData), // Kept for legacy compatibility if needed
};

export const onboardingAPI = {
  registerCompany: (data) => api.post('/api/onboarding/register', data),
};

export const userAPI = {
  getAll: () => api.get('/consumer/get-users'),
  getById: (id) => api.get(`/consumer/get-user/${id}`),
  create: (data) => api.post('/consumer/add-user', data),
  update: (id, data) => api.put(`/consumer/update-user/${id}`, data),
  delete: (id) => api.delete(`/consumer/delete-user/${id}`),
};

export const roleAPI = {
  getAll: () => api.get('/consumer/roles'),
  getById: (id) => api.get(`/consumer/roles/${id}`),
  create: (data) => api.post('/consumer/roles', data),
  update: (id, data) => api.put(`/consumer/roles/${id}`, data),
  delete: (id) => api.delete(`/consumer/roles/${id}`),
};

export const permissionAPI = {
  getAll: () => api.get('/consumer/permissions'),
  getById: (id) => api.get(`/consumer/permissions/${id}`),
  create: (data) => api.post('/consumer/permissions', data),
  update: (id, data) => api.put(`/consumer/permissions/${id}`, data),
  delete: (id) => api.delete(`/consumer/permissions/${id}`),
};

export const moduleAPI = {
  getAll: () => api.get('/consumer/modules'),
  getById: (id) => api.get(`/consumer/modules/${id}`),
  create: (data) => api.post('/consumer/modules', data),
  update: (id, data) => api.put(`/consumer/modules/${id}`, data),
  delete: (id) => api.delete(`/consumer/modules/${id}`),
};

export const customerAPI = {
  getAll: () => api.get('/customers'),
  getById: (id) => api.get(`/customers/${id}`),
  create: (data) => api.post('/customers', data),
  update: (id, data) => api.put(`/customers/${id}`, data),
  delete: (id) => api.delete(`/customers/${id}`),
};
