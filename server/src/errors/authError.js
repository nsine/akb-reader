class AuthError extends Error {
  constructor(message='Authorization failed') {
    super(message);
    this.status = 401;
  }
}

module.exports = AuthError;
