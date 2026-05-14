import { useState, useEffect } from 'react';
import propertyService from '../services/api/propertyService';

export const useProperties = (filters = {}) => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const data = await propertyService.getProperties(filters);
      setProperties(data);
      setLoading(false);
    };
    fetch();
  }, [JSON.stringify(filters)]);

  return { properties, loading, error };
};

export const useProperty = (id) => {
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const fetch = async () => {
      setLoading(true);
      const data = await propertyService.getPropertyById(id);
      setProperty(data);
      setLoading(false);
    };
    fetch();
  }, [id]);

  return { property, loading };
};

export const useFeaturedProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const data = await propertyService.getFeaturedProperties();
      setProperties(data);
      setLoading(false);
    };
    fetch();
  }, []);

  return { properties, loading };
};