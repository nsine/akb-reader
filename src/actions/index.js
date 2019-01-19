import * as api from '../api';

export const UPDATE_TEST_VALUE = 'UPDATE_TEST_VALUE';
export const LOAD_POSTS = 'LOAD_POSTS';
export const LOAD_POSTS_SUCCESS = 'LOAD_POSTS_SUCCESS';

export const loadPosts = (offset, count) => (dispatch) => {
  api.getJokes(offset, count).then(res => {
    dispatch({
      type: LOAD_POSTS_SUCCESS,
      data: res.data.items,
    })
  });
};