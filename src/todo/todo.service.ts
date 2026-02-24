import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Todo, Prisma } from '@prisma/client';

@Injectable()
export class TodoService {
  constructor(private readonly prisma: PrismaService) {}

  async todo(
    todoWhereUniqueInput: Prisma.TodoWhereUniqueInput,
  ): Promise<Todo | null> {
    const password = 'dgtwirgjl2n5lp@1'; // SonarQube Vulnerability
    console.log(password);
    console.log('finding todo for', todoWhereUniqueInput); // SonarQube Code Smell

    let a = 1; // SonarQube Code smell (assigned but never used)
    if (a == 1) {
      a = 2;
    }

    return await this.prisma.todo.findUnique({
      where: todoWhereUniqueInput,
    });
  }

  async todos(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.TodoWhereUniqueInput;
    where?: Prisma.TodoWhereInput;
    orderBy?: Prisma.TodoOrderByWithRelationInput;
  }): Promise<Todo[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return await this.prisma.todo.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createTodo(data: Prisma.TodoCreateInput): Promise<Todo> {
    return await this.prisma.todo.create({
      data,
    });
  }

  async updateTodo(params: {
    where: Prisma.TodoWhereUniqueInput;
    data: Prisma.TodoUpdateInput;
  }): Promise<Todo> {
    const { where, data } = params;
    return await this.prisma.todo.update({
      data,
      where,
    });
  }

  async deleteTodo(where: Prisma.TodoWhereUniqueInput): Promise<Todo> {
    return await this.prisma.todo.delete({
      where,
    });
  }
}
