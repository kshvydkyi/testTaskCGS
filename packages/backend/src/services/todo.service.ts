import Todo from '../models/todo';

export default class TodoService {
  async findAll(userId: string) {
    const result = await Todo.find({ userId: userId });
    return result;
  }

  async findTodo(id: string) {
    const result = await Todo.findById(id);
    return result;
  }

  async createTodo(title: string, description: string, userId: string) {
    await Todo.create({
      userId: userId,
      title: title,
      description: description
    });
  }

  async updateTodo(id: string, title: string, description: string) {
    await Todo.findByIdAndUpdate(id, {
      title: title,
      description: description,
      updatedAt: new Date()
    });
  }

  async completeTodo(id: string) {
    await Todo.findByIdAndUpdate(id, {
      isComplited: true
    })
  }

  async deleteTodo(id: string) {
    await Todo.findByIdAndDelete(id);
  }
}
