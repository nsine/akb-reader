const ValidationError = require('../errors/validationError');

const handleValidationResult = result => {
  if (result.isEmpty()) return;

  const validationObj = result.array().map(e => ({
    param: e.param,
    message: e.msg,
  }));

  throw new ValidationError(validationObj);
};

const doValidation = validator => {
  const validateMiddlewares = Array.isArray(validator) ?
    validator :
    [validator];

  const middlewares = [
    ...validateMiddlewares,
    (req, res, next) => {
      req
        .getValidationResult()
        .then(handleValidationResult)
        .then(next)
        .catch(next);
    },
  ];

  return middlewares;
};

module.exports = {
  doValidation,
};