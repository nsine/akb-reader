const express = require('express');
const router = express.Router();

const vk = require('../external-api/vk');
const { authRequired } = require('../helpers/authMiddleware');
const Joke = require('../models/Joke');

router.get('/', async (req, res) => {
  const offset = req.query.offset || 0;
  const count = req.query.count || 0;
  const vkPosts = await vk.getPosts(offset, count);

  const vkJokes = vkPosts.items;
  const jokesAlreadyInDb = await Joke.find({
    $or: vkJokes.map(post => ({
      vkPostId: post.id,
    })),
  });

  const jokesAlreadyInDbMap = jokesAlreadyInDb.reduce((obj, item) => {
    obj[item.vkPostId] = item;
    return obj;
  }, {});

  const jokesToCreateInDb = vkJokes.map(vkJoke => {
    if (jokesAlreadyInDbMap[vkJoke.id]) return null;
    return {
      vkPostId: vkJoke.id,
      likes: [],
      dislikes: [],
      comments: [],
    };
  }).filter(joke => !!joke);

  const savedJokes = await Joke.create(jokesToCreateInDb);

  const jokesInDbMap = {
    ...jokesAlreadyInDbMap,
    ...(savedJokes || []).reduce((obj, item) => {
      obj[item.vkPostId] = item;
      return obj;
    }, {}),
  };

  const resData = vkJokes.map(vkJoke => {
    const ourData = jokesInDbMap[vkJoke.id];
    return {
      _id: ourData._id,
      text: vkJoke.text,
      date: vkJoke.date,
      likes: ourData.likes,
      dislikes: ourData.dislikes,
      comments: ourData.comments,
    };
  });

  res.json({
    items: resData,
  });
});

const makeLikeOrDislikeFunc = fieldName => async (req, res) => {
  const jokeId = req.params.id;
  const joke = await Joke.findById(jokeId);
  const jokeLikes = joke[fieldName];
  const userId = req.user._id.toString();
  const newJokeLikes = jokeLikes.some(userId => userId === userId) ?
    jokeLikes.filter(userId => userId !== userId) :
    [...jokeLikes, userId];

  joke[fieldName] = newJokeLikes;
  await joke.save();
  res.json({
    myId: userId,
  });
};

router.put('/:id/like', authRequired, (req, res) => {
  const like = makeLikeOrDislikeFunc('likes');
  like(req, res);
});

router.put('/:id/dislike', authRequired, (req, res) => {
  const dislike = makeLikeOrDislikeFunc('dislikes');
  dislike(req, res);
});

router.put('/:id/vklike', async (req, res) => {
});

router.put('/:id/comments', async (req, res) => {
});

module.exports = router;
