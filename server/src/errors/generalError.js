class GeneralError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status || 400;
  }
}

module.exports = GeneralError;