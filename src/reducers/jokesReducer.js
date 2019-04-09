import * as constants from '../actions/jokesActions';

const initialState = {
  posts: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case constants.LOAD_POSTS_SUCCESS:
      return {
        ...state,
        posts: [...state.posts, ...action.data],
      }
    default:
      return state
  }
}