import { Router } from 'express';
import {
  loginValidateChainMethod,
  registrationValidateChainMethod,
  updatePasswordValidateChainMethod
} from '../../validations/form.validation';
import { validateRequestSchema } from '../../middleware/validationError.middleware';
import tryCatch from '../../utils/try-catch.utils';
import userController from '../../controllers/user.controller';
import { isLoginExist } from '../../middleware/isExist.middleware';
import User from '../../models/User';
import { isAutorised } from '../../middleware/isAuthorized.middleware';

const router: Router = Router();

// @route   POST api/user
// @desc    Register user given their email and password, returns the token upon successful registration
// @access  Public
router.post(
  '/register',
  registrationValidateChainMethod,
  validateRequestSchema,
  isLoginExist(User),
  tryCatch(userController.registerUser.bind(userController)),
  userController.registerUser.bind(userController)
);

router.post(
  '/login',
  loginValidateChainMethod,
  validateRequestSchema,
  tryCatch(userController.loginUser.bind(userController)),
  userController.loginUser.bind(userController)
);

router.patch(
  '/update-password/:token',
  isAutorised,
  updatePasswordValidateChainMethod,
  validateRequestSchema,
  tryCatch(userController.updatePassword.bind(userController)),
  userController.loginUser.bind(userController)
);

export default router;
