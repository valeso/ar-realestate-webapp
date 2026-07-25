import apiClient from './api';

export interface Property {
  id: string;
  title: string;
  price: number;
  property_type: string;
  bedrooms?: number;
  bathrooms?: number;
  location: {
    latitude: number;
    longitude: number;
  };
  images: Array<{
    id: string;
    url: string;
  }>;
  seller: {
    id: string;
    full_name: string;
    avatar_url?: string;
  };
  created_at: string;
}

export interface PropertyFilters {
  page?: number;
  limit?: number;
  property_type?: string;
  min_price?: number;
  max_price?: number;
  bedrooms?: number;
  bathrooms?: number;
  search?: string;
  latitude?: number;
  longitude?: number;
  radius?: number;
}

export const propertyService = {
  getProperties: async (filters: PropertyFilters) => {
    const response = await apiClient.get('/properties', { params: filters });
    return response.data;
  },

  getPropertyById: async (id: string) => {
    const response = await apiClient.get(`/properties/${id}`);
    return response.data;
  },

  createProperty: async (data: FormData) => {
    const response = await apiClient.post('/properties', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  updateProperty: async (id: string, data: Partial<Property>) => {
    const response = await apiClient.put(`/properties/${id}`, data);
    return response.data;
  },

  deleteProperty: async (id: string) => {
    const response = await apiClient.delete(`/properties/${id}`);
    return response.data;
  },
};
