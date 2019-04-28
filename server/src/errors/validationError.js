const GeneralError = require('./generalError');

class ValidationError extends GeneralError {
  constructor(validationData) {
    super('Validation Error');

    this.status = 422;
    this.details = validationData;
  }
}

module.exports = ValidationError;