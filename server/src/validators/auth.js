const { body } = require('express-validator/check');

exports.registrationValidator = [
  body('name', 'userName doesn\'t exists').exists(),
  body('password', 'Invalid password').exists().isLength({ min: 5 }),
];
