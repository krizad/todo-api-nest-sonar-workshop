import { Test, TestingModule } from '@nestjs/testing';
import { TodoService } from './todo.service';
import { PrismaService } from '../prisma/prisma.service';

describe('TodoService', () => {
  let service: TodoService;

  const mockPrismaService = {
    todo: {
      findUnique: jest.fn(),
      findMany: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodoService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<TodoService>(TodoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('todo', () => {
    it('should call prisma.todo.findUnique', async () => {
      const todo = {
        id: 1,
        title: 'Test Todo',
        description: 'Test Description',
        isCompleted: false,
        createdAt: new Date(),
      };
      mockPrismaService.todo.findUnique.mockResolvedValue(todo);

      const result = await service.todo({ id: 1 });
      expect(result).toEqual(todo);
      expect(mockPrismaService.todo.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it('should return null if todo not found', async () => {
      mockPrismaService.todo.findUnique.mockResolvedValue(null);
      const result = await service.todo({ id: 999 });
      expect(result).toBeNull();
    });
  });

  describe('todos', () => {
    it('should call prisma.todo.findMany with default parameters', async () => {
      const todos = [
        {
          id: 1,
          title: 'Test Todo',
          description: 'Test Description',
          isCompleted: false,
          createdAt: new Date(),
        },
      ];
      mockPrismaService.todo.findMany.mockResolvedValue(todos);

      const result = await service.todos({});
      expect(result).toEqual(todos);
      expect(mockPrismaService.todo.findMany).toHaveBeenCalledWith({
        skip: undefined,
        take: undefined,
        cursor: undefined,
        where: undefined,
        orderBy: undefined,
      });
    });

    it('should call prisma.todo.findMany with all parameters', async () => {
      const params = {
        skip: 5,
        take: 10,
        cursor: { id: 1 },
        where: { isCompleted: true },
        orderBy: { createdAt: 'desc' as const },
      };
      mockPrismaService.todo.findMany.mockResolvedValue([]);

      await service.todos(params);
      expect(mockPrismaService.todo.findMany).toHaveBeenCalledWith(params);
    });
  });

  describe('createTodo', () => {
    it('should call prisma.todo.create', async () => {
      const todoData = { title: 'New Todo' };
      const createdTodo = {
        id: 1,
        ...todoData,
        description: null,
        isCompleted: false,
        createdAt: new Date(),
      };
      mockPrismaService.todo.create.mockResolvedValue(createdTodo);

      const result = await service.createTodo(todoData);
      expect(result).toEqual(createdTodo);
      expect(mockPrismaService.todo.create).toHaveBeenCalledWith({
        data: todoData,
      });
    });
  });

  describe('updateTodo', () => {
    it('should call prisma.todo.update', async () => {
      const updateData = { isCompleted: true };
      const updatedTodo = {
        id: 1,
        title: 'Test Todo',
        description: null,
        isCompleted: true,
        createdAt: new Date(),
      };
      mockPrismaService.todo.update.mockResolvedValue(updatedTodo);

      const result = await service.updateTodo({
        where: { id: 1 },
        data: updateData,
      });
      expect(result).toEqual(updatedTodo);
      expect(mockPrismaService.todo.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: updateData,
      });
    });
  });

  describe('deleteTodo', () => {
    it('should call prisma.todo.delete', async () => {
      const deletedTodo = {
        id: 1,
        title: 'Test Todo',
        description: null,
        isCompleted: false,
        createdAt: new Date(),
      };
      mockPrismaService.todo.delete.mockResolvedValue(deletedTodo);

      const result = await service.deleteTodo({ id: 1 });
      expect(result).toEqual(deletedTodo);
      expect(mockPrismaService.todo.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });
  });
});
