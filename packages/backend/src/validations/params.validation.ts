import { param } from 'express-validator/check';

const reqParamsValidation = [
  param('todo').exists({ checkFalsy: true }).isString().withMessage('Todo should be a string'),
];

export default reqParamsValidation;
