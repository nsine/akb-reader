const jwt = require('jsonwebtoken');

const User = require('../models/User');
const AuthError = require('../errors/authError');

const getUserFromReqHeader = async (req) => {
  const authHeader = req.headers['authorization'] || '';
  const token = (authHeader.match(/Bearer (.+)/) ||[])[1];
  if (!token) {
    return null;
  }

  const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

  const user = await User.findById(decodedToken.id);
  return user;
};

const authorize = async (req, res, next) => {
  const user = await getUserFromReqHeader(req);
  req.user = user;
  next();
};

const authRequired = async (req, res, next) => {
  const user = await getUserFromReqHeader(req);
  if (!user) {
    next(new AuthError());
  }
  req.user = user;
  next();
};


module.exports = {
  authorize,
  authRequired,
};
