import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export function getJokes(offset = 0, count = 0) {
  return axiosInstance.get('/jokes', {
    params: {
      offset,
      count,
    },
  });
}

export function login(username, password) {
  return axiosInstance.post('/auth/login', {
    name: username,
    password,
  });
}

export function loginOrRegisterWithVk(code) {
  return axiosInstance.post('/auth/vklogin', {
    code,
  });
}
