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
    };
  case constants.LIKE_JOKE: {
    const { jokeId, myId } = action.payload;

    const joke = state.posts.find(joke => joke._id === jokeId);

    const newJokeLikes = joke.likes.some(userId => userId === myId) ?
      joke.likes.filter(userId => userId !== myId) :
      [...joke.likes, myId];
    const newJoke = {
      ...joke,
      likes: newJokeLikes,
    };

    return {
      ...state,
      posts: state.posts.map(post => {
        if (post._id !== jokeId) return post;
        return newJoke;
      }),
    };
  }

  case constants.DISLIKE_JOKE:
    return {
      ...state,
      posts: [...state.posts, ...action.data],
    };
  default:
    return state;
  }
};
