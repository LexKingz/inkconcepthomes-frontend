import apiClient from './client';
import { MOCK_PROPERTIES } from '../../utils/mockData';

// Toggle this flag when real backend is ready
const USE_MOCK = true;

const propertyService = {
  getProperties: async (filters = {}) => {
    if (USE_MOCK) {
      let data = [...MOCK_PROPERTIES];
      if (filters.status) data = data.filter(p => p.status === filters.status);
      if (filters.type) data = data.filter(p => p.type === filters.type);
      if (filters.minPrice) data = data.filter(p => p.price >= filters.minPrice);
      if (filters.maxPrice) data = data.filter(p => p.price <= filters.maxPrice);
      if (filters.beds) data = data.filter(p => p.beds >= parseInt(filters.beds));
      if (filters.baths) data = data.filter(p => p.baths >= parseInt(filters.baths));
      if (filters.city) data = data.filter(p => p.city.toLowerCase().includes(filters.city.toLowerCase()));
      return data;
    }
    const response = await apiClient.get('/properties/', { params: filters });
    return response.data;
  },

  getPropertyById: async (id) => {
    if (USE_MOCK) {
      return MOCK_PROPERTIES.find(p => p.id === parseInt(id)) || null;
    }
    const response = await apiClient.get(`/properties/${id}/`);
    return response.data;
  },

  getFeaturedProperties: async () => {
    if (USE_MOCK) {
      return MOCK_PROPERTIES.filter(p => p.featured);
    }
    const response = await apiClient.get('/properties/featured/');
    return response.data;
  },

  getNotableSales: async () => {
    if (USE_MOCK) {
      return MOCK_PROPERTIES.filter(p => p.status === 'sold');
    }
    const response = await apiClient.get('/properties/sold/');
    return response.data;
  },
};

export default propertyService;