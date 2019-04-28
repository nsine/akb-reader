import axios from 'axios';

const axiosInstance = () => {
  const userJson = localStorage.getItem('user');
  let token = '';

  if (userJson) {
    const user = JSON.parse(userJson);
    token = user.token;
  }
  return axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      'authorization': `Bearer ${token}`,
    },
  });
};

export function getJokes(offset = 0, count = 0) {
  return axiosInstance().get('/jokes', {
    params: {
      offset,
      count,
    },
  });
}

export function likeJoke(id) {
  return axiosInstance().put(`/jokes/${id}/like`);
}

export function dislikeJoke(id) {
  return axiosInstance().put(`/jokes/${id}/dislike`);
}

export function login(username, password) {
  return axiosInstance().post('/auth/login', {
    name: username,
    password,
  });
}

export function loginOrRegisterWithVk(code) {
  return axiosInstance().post('/auth/vklogin', {
    code,
  });
}
