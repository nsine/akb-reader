const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const axios = require('axios');

const User = require('../models/User');
const { doValidation } = require('../validators');
const { registrationValidator } = require('../validators/auth');
const GeneralError = require('../errors/generalError');
const { withAsyncErrorHandler } = require('../errors');

const createTokenForUser = user => jwt.sign({
  id: user._id,
  name: user.name,
}, process.env.JWT_SECRET_KEY);

const responseWithTokenAndUserData = (res, user) => {
  const token = createTokenForUser(user);

  res.json({
    token,
    name: user.name,
  });
};

router.post('/vklogin', async (req, res) => {
  const vkCode = req.body.code;

  axios.get('https://oauth.vk.com/access_token', {
    params: {
      client_id: process.env.VK_APP_ID,
      client_secret: process.env.VK_SECRET,
      code: vkCode,
      redirect_uri: process.env.VK_REDIRECT_URL,
    },
  }).then(async vkRes => {
    const vkToken = vkRes.data.access_token;
    const vkUserId = vkRes.data.user_id;

    const existingUser = await User.findOne({
      vkId: vkUserId,
    });

    if (existingUser) {
      existingUser.vkToken = vkToken;
      await existingUser.save();
      return responseWithTokenAndUserData(res, existingUser);
    }

    const user = new User({
      name: vkUserId,
      vkId: vkUserId,
      vkToken: vkToken,
    });

    responseWithTokenAndUserData(res, user);
  }).catch(err => {
    console.log(err);
  });
});

router.post('/login', doValidation(registrationValidator), withAsyncErrorHandler(async (req, res) => {
  const user = await User.findOne({
    name: req.body.name,
  });

  if (!user) {
    throw new GeneralError('User is not found');
  }

  const isPasswordCorrect = user.checkPassword(req.body.password);
  if (!isPasswordCorrect) {
    throw new GeneralError('Password is incorrect');
  }

  responseWithTokenAndUserData(res, user);
}));

router.post('/register', doValidation(registrationValidator), withAsyncErrorHandler(async (req, res, next) => {
  const { name, password } = req.body;

  const existingUser = await User.findOne({
    name,
  });

  if (existingUser) {
    throw new GeneralError('User already exists');
  }

  const user = new User({
    name,
  });

  user.setPassword(password);
  return user.save().then(() => {
    res.json({
      success: true,
      name: user.name,
    });
  });
}));

module.exports = router;
