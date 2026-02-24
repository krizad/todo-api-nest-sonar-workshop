import { Test, TestingModule } from '@nestjs/testing';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { NotFoundException } from '@nestjs/common';

describe('TodoController', () => {
  let controller: TodoController;
  let service: TodoService;

  const mockTodoService = {
    todos: jest.fn(),
    todo: jest.fn(),
    createTodo: jest.fn(),
    updateTodo: jest.fn(),
    deleteTodo: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodoController],
      providers: [
        {
          provide: TodoService,
          useValue: mockTodoService,
        },
      ],
    }).compile();

    controller = module.get<TodoController>(TodoController);
    service = module.get<TodoService>(TodoService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllTodos', () => {
    it('should return an array of todos', async () => {
      const result = [];
      mockTodoService.todos.mockResolvedValue(result);

      expect(await controller.getAllTodos()).toBe(result);
      expect(service.todos).toHaveBeenCalledWith({});
    });
  });

  describe('getTodoById', () => {
    it('should return a single todo', async () => {
      const result = { id: 1, title: 'Test' };
      mockTodoService.todo.mockResolvedValue(result);

      expect(await controller.getTodoById('1')).toBe(result);
      expect(service.todo).toHaveBeenCalledWith({ id: 1 });
    });

    it('should throw NotFoundException if todo not found', async () => {
      mockTodoService.todo.mockResolvedValue(null);

      await expect(controller.getTodoById('1')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('createTodo', () => {
    it('should create a new todo', async () => {
      const todoData = { title: 'Test' };
      const result = { id: 1, ...todoData };
      mockTodoService.createTodo.mockResolvedValue(result);

      expect(await controller.createTodo(todoData)).toBe(result);
      expect(service.createTodo).toHaveBeenCalledWith(todoData);
    });
  });

  describe('updateTodo', () => {
    it('should update a todo', async () => {
      const todoData = { title: 'Updated' };
      const result = { id: 1, ...todoData };
      mockTodoService.updateTodo.mockResolvedValue(result);

      expect(await controller.updateTodo('1', todoData)).toBe(result);
      expect(service.updateTodo).toHaveBeenCalledWith({
        where: { id: 1 },
        data: todoData,
      });
    });
  });

  describe('deleteTodo', () => {
    it('should delete a todo', async () => {
      const result = { id: 1, title: 'Deleted' };
      mockTodoService.deleteTodo.mockResolvedValue(result);

      expect(await controller.deleteTodo('1')).toBe(result);
      expect(service.deleteTodo).toHaveBeenCalledWith({ id: 1 });
    });
  });
});
