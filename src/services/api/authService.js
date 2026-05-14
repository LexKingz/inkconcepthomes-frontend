import apiClient from './client';

const authService = {
  login: async (credentials) => {
    const response = await apiClient.post('/auth/login/', credentials);
    return response.data;
  },

  logout: async () => {
    const refreshToken = localStorage.getItem('refresh_token');
    await apiClient.post('/auth/logout/', { refresh: refreshToken });
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  },

  refreshToken: async () => {
    const refreshToken = localStorage.getItem('refresh_token');
    const response = await apiClient.post('/auth/token/refresh/', { refresh: refreshToken });
    localStorage.setItem('access_token', response.data.access);
    return response.data;
  },

  getProfile: async () => {
    const response = await apiClient.get('/auth/profile/');
    return response.data;
  },
};

export default authService;