import apiClient from './client';

const USE_MOCK = true;

const contactService = {
  submitContactForm: async (formData) => {
    if (USE_MOCK) {
      await new Promise(resolve => setTimeout(resolve, 1200));
      return { success: true, message: 'Your message has been received. We will be in touch shortly.' };
    }
    const response = await apiClient.post('/contact/', formData);
    return response.data;
  },

  submitPropertyInquiry: async (propertyId, formData) => {
    if (USE_MOCK) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return { success: true, message: 'Inquiry submitted successfully.' };
    }
    const response = await apiClient.post(`/properties/${propertyId}/inquire/`, formData);
    return response.data;
  },

  subscribeNewsletter: async (email) => {
    if (USE_MOCK) {
      await new Promise(resolve => setTimeout(resolve, 800));
      return { success: true };
    }
    const response = await apiClient.post('/newsletter/subscribe/', { email });
    return response.data;
  },
};

export default contactService;