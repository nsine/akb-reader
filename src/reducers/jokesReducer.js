import * as constants from '../actions';

export default (state = {}, action) => {
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