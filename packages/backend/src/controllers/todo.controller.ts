import { Response, Request } from 'express';
import * as jwt from 'jsonwebtoken';
import { TypedRequestBody } from '../types/request.types';
import TodoService from '../services/todo.service';

export class TodoController {
  constructor(private todoService: TodoService) {}

  async getAllTodo(req: Request, res: Response) {
    // TODO: Write your implementation here
    const userData = jwt.verify(req.params.token, 'jwt-key');
    const todos = await this.todoService.findAll(userData.userId);
    return todos;
  }

  async getTodo(req: TypedRequestBody, res: Response) {
    const todo = await this.todoService.findTodo(req.params.todo);
    return todo;
  }

  async createNewTodo(req: TypedRequestBody, res: Response) {
    const userData = jwt.verify(req.params.token, 'jwt-key');
    await this.todoService.createTodo(req.body.title, req.body.description, userData.userId);
  }

  async updateTodo(req: TypedRequestBody, res: Response) {
    await this.todoService.updateTodo(req.params.todo, req.body.title, req.body.description);
  }

  async deleteTodo(req: TypedRequestBody, res: Response) {
    await this.todoService.deleteTodo(req.params.todo);
  }
}

const todoController = new TodoController(new TodoService());
export default todoController;
