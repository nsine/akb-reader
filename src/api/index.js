import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

export function getJokes(offset = 0, count = 0) {
  return axiosInstance.get('/jokes', {
    params: {
      offset,
      count,
    },
  });
};