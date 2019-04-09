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
      const newState = {
        ...state,
        isLoggedIn: true,
        token: action.payload.token,
        name: action.payload.username,
      };

      localStorage.setItem('user', JSON.stringify(newState));
      
      return newState;
    default:
      return state
  }
}