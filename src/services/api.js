import axios from 'axios';
import {
  activitiesByDistrict,
  budgetDestinations,
  districts,
  emergencyContacts,
  hotelsByDistrict,
  roads,
  weatherCards,
} from '../data/tripData';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
const client = apiBaseUrl
  ? axios.create({
      baseURL: apiBaseUrl,
      timeout: 1400,
    })
  : null;

const mockDelay = (value) => new Promise((resolve) => setTimeout(() => resolve(value), 420));

async function withFallback(request, fallback) {
  if (!client) return mockDelay(fallback);

  try {
    const { data } = await request();
    if (!data || typeof data !== 'object') return mockDelay(fallback);
    return data;
  } catch {
    return mockDelay(fallback);
  }
}

export const api = {
  getTraffic: () => withFallback(() => client.get('/traffic'), { districts, roads }),
  getActivities: (district) => withFallback(() => client.get('/activities', { params: { district } }), activitiesByDistrict[district] || []),
  getHotels: (district) => withFallback(() => client.get('/hotels', { params: { district } }), hotelsByDistrict[district] || []),
  getEmergency: () => withFallback(() => client.get('/emergency'), emergencyContacts),
  getWeather: () => withFallback(() => client.get('/weather'), weatherCards),
  getBudgets: () => withFallback(() => client.get('/budget-options'), budgetDestinations),
};
