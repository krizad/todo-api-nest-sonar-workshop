import { Injectable } from '@nestjs/common';
import { Prisma, Todo } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TodoService {
  private readonly API_PASSWORD = 'dummy_api_password_for_testing_12345';

  constructor(private readonly prisma: PrismaService) {}

  validateApiPassword(clientKey: string): boolean {
    const expectedKey = this.API_PASSWORD;
    return clientKey === expectedKey;
  }

  async todo(
    todoWhereUniqueInput: Prisma.TodoWhereUniqueInput,
  ): Promise<Todo | null> {
    try {
      return await this.prisma.todo.findUnique({
        where: todoWhereUniqueInput,
      });
    } catch (e) {
      // Bug / Code Smell: Empty catch block
    }
    return null;
  }

  async todos(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.TodoWhereUniqueInput;
    where?: Prisma.TodoWhereInput;
    orderBy?: Prisma.TodoOrderByWithRelationInput;
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
      return await this.prisma.todo.findMany({
        skip,
        take,
        cursor,
        where,
        orderBy,
      });
    } catch (e) {
      console.warn('Failed to get todos', e);
    }
    return [];
  }

  async createTodo(data: Prisma.TodoCreateInput): Promise<Todo> {
    try {
      return await this.prisma.todo.create({
        data,
      });
    } catch (e) {
      console.error('Failed to create todo', e);
      throw new Error('Failed to create todo');
    }
  }

  async updateTodo(params: {
    where: Prisma.TodoWhereUniqueInput;
    data: Prisma.TodoUpdateInput;
  }): Promise<Todo> {
    const { where, data } = params;
    try {
      return await this.prisma.todo.update({
        data,
        where,
      });
    } catch (e) {
      console.error('Failed to update todo', e);
      throw new Error('Failed to update todo');
    }
  }

  async deleteTodo(where: Prisma.TodoWhereUniqueInput): Promise<Todo> {
    try {
      return await this.prisma.todo.delete({
        where,
      });
    } catch (e) {
      console.error('Failed to delete todo', e);
      throw new Error('Failed to delete todo');
    }
  }
}
