import apiClient from './client';
import { MOCK_COMMUNITIES } from '../../utils/mockData';

const USE_MOCK = true;

const communityService = {
  getCommunities: async () => {
    if (USE_MOCK) return MOCK_COMMUNITIES;
    const response = await apiClient.get('/communities/');
    return response.data;
  },

  getCommunityById: async (id) => {
    if (USE_MOCK) {
      return MOCK_COMMUNITIES.find(c => c.id === parseInt(id)) || null;
    }
    const response = await apiClient.get(`/communities/${id}/`);
    return response.data;
  },
};

export default communityService;