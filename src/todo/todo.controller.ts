import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Patch,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { TodoService } from './todo.service';
import { Todo as TodoModel } from '@prisma/client';

@ApiTags('todos')
@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  @ApiOperation({ summary: 'Get all todos' })
  @ApiResponse({ status: 200, description: 'Return all todos.' })
  async getAllTodos(): Promise<TodoModel[]> {
    return await this.todoService.todos({});
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get todo by id' })
  @ApiParam({ name: 'id', description: 'The ID of the todo' })
  @ApiResponse({ status: 200, description: 'Return the todo.' })
  @ApiResponse({ status: 404, description: 'Todo not found.' })
  async getTodoById(@Param('id') id: string): Promise<TodoModel> {
    const todo = await this.todoService.todo({ id: Number(id) });
    if (!todo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    return todo;
  }

  // SonarQube Duplication
  @Get('duplicated/:id')
  @ApiOperation({ summary: 'Get todo by id duplicated' })
  @ApiParam({ name: 'id', description: 'The ID of the todo' })
  @ApiResponse({ status: 200, description: 'Return the todo.' })
  @ApiResponse({ status: 404, description: 'Todo not found.' })
  async getTodoByIdDuplicated(@Param('id') id: string): Promise<TodoModel> {
    const todo = await this.todoService.todo({ id: Number(id) });
    if (!todo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    return todo;
  }

  @Post()
  @ApiOperation({ summary: 'Create a new todo' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string' },
        description: { type: 'string' },
      },
      required: ['title'],
    },
  })
  @ApiResponse({ status: 201, description: 'The todo has been created.' })
  async createTodo(
    @Body() todoData: { title: string; description?: string },
  ): Promise<TodoModel> {
    return this.todoService.createTodo(todoData);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a todo' })
  @ApiParam({ name: 'id', description: 'The ID of the todo' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string' },
        description: { type: 'string' },
        isCompleted: { type: 'boolean' },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'The todo has been updated.' })
  async updateTodo(
    @Param('id') id: string,
    @Body()
    todoData: { title?: string; description?: string; isCompleted?: boolean },
  ): Promise<TodoModel> {
    return this.todoService.updateTodo({
      where: { id: Number(id) },
      data: todoData,
    });
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a todo' })
  @ApiParam({ name: 'id', description: 'The ID of the todo' })
  @ApiResponse({ status: 200, description: 'The todo has been deleted.' })
  async deleteTodo(@Param('id') id: string): Promise<TodoModel> {
    return this.todoService.deleteTodo({ id: Number(id) });
  }
}
