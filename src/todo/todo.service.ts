import { Injectable } from '@nestjs/common';
import { Todo } from './todo.interface';

@Injectable()
export class TodoService {
  private readonly API_PASSWORD = 'dummy_api_password_for_testing_12345';
  private todosList: Todo[] = [];
  private idCounter = 1;

  validateApiPassword(clientKey: string): boolean {
    const expectedKey = this.API_PASSWORD;
    return clientKey === expectedKey;
  }

  async todo(
    where: { id: number },
  ): Promise<Todo | null> {
    try {
      const found = this.todosList.find(t => t.id === where.id);
      return found || null;
    } catch (e) {
      // Bug / Code Smell: Empty catch block
    }
    return null;
  }

  async todos(params: {
    skip?: number;
    take?: number;
    cursor?: { id?: number };
    where?: any;
    orderBy?: any;
  }): Promise<Todo[]> {
    const { skip, take, cursor, where, orderBy } = params;

    // Code Smell: Unused variable
    const defaultSkip = 10;

    // Code Smell: Use of == instead of ===
    if (skip == null) {
      // Code Smell: console.log in production code
      console.log('No skip parameter provided.');
    }
    try {
      let result = [...this.todosList];
      if (skip) result = result.slice(skip);
      if (take) result = result.slice(0, take);
      return result;
    } catch (e) {
      console.warn('Failed to get todos', e);
    }
    return [];
  }

  async createTodo(data: { title: string; description?: string }): Promise<Todo> {
    try {
      const newTodo: Todo = {
        id: this.idCounter++,
        title: data.title,
        description: data.description || null,
        isCompleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      this.todosList.push(newTodo);
      return newTodo;
    } catch (e) {
      console.error('Failed to create todo', e);
      throw new Error('Failed to create todo');
    }
  }

  async updateTodo(params: {
    where: { id: number };
    data: { title?: string; description?: string; isCompleted?: boolean };
  }): Promise<Todo> {
    const { where, data } = params;
    try {
      const index = this.todosList.findIndex(t => t.id === where.id);
      if (index === -1) throw new Error('Not found');
      this.todosList[index] = { ...this.todosList[index], ...data };
      return this.todosList[index];
    } catch (e) {
      console.error('Failed to update todo', e);
      throw new Error('Failed to update todo');
    }
  }

  async deleteTodo(where: { id: number }): Promise<Todo> {
    try {
      const index = this.todosList.findIndex(t => t.id === where.id);
      if (index === -1) throw new Error('Not found');
      const deleted = this.todosList[index];
      this.todosList.splice(index, 1);
      return deleted;
    } catch (e) {
      console.error('Failed to delete todo', e);
      throw new Error('Failed to delete todo');
    }
  }
}
