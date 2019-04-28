const mongoose = require('mongoose');
const crypto = require('crypto');
const { Schema } = mongoose;

// eslint-disable-next-line no-sync
const hashPassword = (password, salt) => crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512').toString('hex');

const UsersSchema = new Schema({
  name: String,
  hash: String,
  salt: String,
  vkId: String,
  vkToken: String,
});

UsersSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = hashPassword(password, this.salt);
};

UsersSchema.methods.checkPassword = function (password) {
  const hash = hashPassword(password, this.salt);
  return hash === this.hash;
};


module.exports = mongoose.model('users', UsersSchema);
