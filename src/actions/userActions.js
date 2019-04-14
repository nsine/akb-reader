import * as api from '../api';

export const SET_LOGGED_IN_USER = 'SET_LOGGED_IN_USER';
export const LOGOUT = 'LOGOUT';

export const loginWithVk = vkCode => dispatch => {
  api.loginOrRegisterWithVk(vkCode).then(res => {
    dispatch({
      type: SET_LOGGED_IN_USER,
      payload: {
        token: res.data.token,
        username: res.data.name,
      },
    });
  });
};

export const login = (username, password) => dispatch => {
  api.login(username, password).then(res => {
    dispatch({
      type: SET_LOGGED_IN_USER,
      payload: {
        token: res.data.token,
        username: res.data.name,
      },
    });
  });
};

export const logout = () => ({
  type: 'LOGOUT',
});
