import * as constants from '../actions/userActions';

let user = JSON.parse(localStorage.getItem('user'));

const initialState = user || {
  isLoggedIn: false,
  token: null,
  name: null,
  id: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
  case constants.SET_LOGGED_IN_USER:
    // eslint-disable-next-line no-case-declarations
    const newState = {
      ...state,
      isLoggedIn: true,
      token: action.payload.token,
      id: action.payload.id,
      name: action.payload.username,
    };

    localStorage.setItem('user', JSON.stringify(newState));

    return newState;
  case constants.LOGOUT:
    localStorage.removeItem('user');
    return {
      ...state,
      isLoggedIn: false,
      token: null,
      id: null,
      name: null,
    };
  default:
    return state;
  }
};
