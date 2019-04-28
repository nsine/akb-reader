import { combineReducers } from 'redux';

import jokesReducer from './jokesReducer';
import userReducer from './userReducer';

export default combineReducers({
  jokes: jokesReducer,
  user: userReducer,
});