import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Patch,
  Delete,
  NotFoundException,
  Query,
  UnauthorizedException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiQuery,
} from '@nestjs/swagger';
import { TodoService } from './todo.service';
import { Todo as TodoModel } from './todo.interface';

@ApiTags('todos')
@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  @ApiOperation({ summary: 'Get all todos' })
  @ApiQuery({
    name: 'apiKey',
    required: true,
    description: 'API Key for validation',
  })
  @ApiResponse({ status: 200, description: 'Return all todos.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async getAllTodos(@Query('apiKey') apiKey: string): Promise<TodoModel[]> {
    if (!this.todoService.validateApiPassword(apiKey)) {
      throw new UnauthorizedException('Invalid API Key provided');
    }
    return await this.todoService.todos({});
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get todo by id' })
  @ApiParam({ name: 'id', description: 'The ID of the todo' })
  @ApiQuery({
    name: 'apiKey',
    required: true,
    description: 'API Key for validation',
  })
  @ApiResponse({ status: 200, description: 'Return the todo.' })
  @ApiResponse({ status: 404, description: 'Todo not found.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async getTodoById(
    @Param('id') id: string,
    @Query('apiKey') apiKey: string,
  ): Promise<TodoModel> {
    if (!this.todoService.validateApiPassword(apiKey)) {
      throw new UnauthorizedException('Invalid API Key provided');
    }
    const todo = await this.todoService.todo({ id: Number(id) });
    if (!todo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    return todo;
  }

  @Post()
  @ApiOperation({ summary: 'Create a new todo' })
  @ApiQuery({
    name: 'apiKey',
    required: true,
    description: 'API Key for validation',
  })
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
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async createTodo(
    @Body() todoData: { title: string; description?: string },
    @Query('apiKey') apiKey: string,
  ): Promise<TodoModel> {
    if (!this.todoService.validateApiPassword(apiKey)) {
      throw new UnauthorizedException('Invalid API Key provided');
    }
    // Code Smell: Commented out code
    // const newTodo = new Todo();
    // newTodo.title = todoData.title;
    // await this.todoService.save(newTodo);

    // Code Smell: Logging object directly in production
    console.log('Creating todo: ', todoData);

    return this.todoService.createTodo(todoData);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a todo' })
  @ApiParam({ name: 'id', description: 'The ID of the todo' })
  @ApiQuery({
    name: 'apiKey',
    required: true,
    description: 'API Key for validation',
  })
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
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async updateTodo(
    @Param('id') id: string,
    @Body()
    todoData: { title?: string; description?: string; isCompleted?: boolean },
    @Query('apiKey') apiKey: string,
  ): Promise<TodoModel> {
    if (!this.todoService.validateApiPassword(apiKey)) {
      throw new UnauthorizedException('Invalid API Key provided');
    }
    return this.todoService.updateTodo({
      where: { id: Number(id) },
      data: todoData,
    });
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a todo' })
  @ApiParam({ name: 'id', description: 'The ID of the todo' })
  @ApiQuery({
    name: 'apiKey',
    required: true,
    description: 'API Key for validation',
  })
  @ApiResponse({ status: 200, description: 'The todo has been deleted.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async deleteTodo(
    @Param('id') id: string,
    @Query('apiKey') apiKey: string,
  ): Promise<TodoModel> {
    if (!this.todoService.validateApiPassword(apiKey)) {
      throw new UnauthorizedException('Invalid API Key provided');
    }
    return this.todoService.deleteTodo({ id: Number(id) });
  }
}
