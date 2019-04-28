import * as api from '../api';

export const LOAD_POSTS = 'LOAD_POSTS';
export const LOAD_POSTS_SUCCESS = 'LOAD_POSTS_SUCCESS';

export const LIKE_JOKE = 'LIKE_JOKE';
export const DISLIKE_JOKE = 'DISLIKE_JOKE';

export const loadPosts = (offset, count) => (dispatch) => {
  api.getJokes(offset, count).then(res => {
    dispatch({
      type: LOAD_POSTS_SUCCESS,
      data: res.data.items,
    });
  });
};

export const likeJoke = jokeId => (dispatch) => {
  api.likeJoke(jokeId).then(res => {
    dispatch({
      type: LIKE_JOKE,
      payload: {
        jokeId,
        myId: res.data.myId,
      },
    });
  });
};

export const dislikeJoke = jokeId => (dispatch) => {
  api.dislikeJoke(jokeId).then(res => {
    dispatch({
      type: DISLIKE_JOKE,
      payload: {
        jokeId,
        myId: res.data.myId,
      },
    });
  });
};
