import { Router } from 'express';
import { formValidateChainMethod } from '../../validations/form.validation';
import reqParamsValidation from '../../validations/params.validation';
import todoController from '../../controllers/todo.controller';
import { validateRequestSchema } from '../../middleware/validationError.middleware';
import tryCatch from '../../utils/try-catch.utils';
import isExist from '../../middleware/isExist.middleware';
import Todo from '../../models/todo';
import { isAutorised } from '../../middleware/isAuthorized.middleware';
import isAccess from '../../middleware/isAccess.middleware';

const todosRouter: Router = Router();

todosRouter.get(
  '/find-all/:token',
  isAutorised,
  tryCatch(todoController.getAllTodo.bind(todoController)),
  todoController.getAllTodo.bind(todoController)
);
todosRouter.get(
  '/find/:todo',
  isExist(Todo),
  tryCatch(todoController.getTodo.bind(todoController)),
  todoController.getTodo.bind(todoController)
);
todosRouter.post(
  '/create/:token',
  isAutorised,
  formValidateChainMethod,
  validateRequestSchema,
  tryCatch(todoController.createNewTodo.bind(todoController)),
  todoController.createNewTodo.bind(todoController)
);
todosRouter.delete(
  '/delete/:todo/:token',
  isAutorised,
  reqParamsValidation,
  validateRequestSchema,
  isExist(Todo),
  isAccess(Todo),
  tryCatch(todoController.deleteTodo.bind(todoController)),
  todoController.deleteTodo.bind(todoController)
);
todosRouter.patch(
  '/update/:todo/:token',
  isAutorised,
  formValidateChainMethod,
  reqParamsValidation,
  validateRequestSchema,
  isExist(Todo),
  isAccess(Todo),
  tryCatch(todoController.updateTodo.bind(todoController)),
  todoController.updateTodo.bind(todoController)
);
export default todosRouter;
