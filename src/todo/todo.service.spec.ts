import { Test, TestingModule } from '@nestjs/testing';
import { TodoService } from './todo.service';

describe('TodoService', () => {
  let service: TodoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TodoService],
    }).compile();

    service = module.get<TodoService>(TodoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('todo', () => {
    it('should return null if todo not found', async () => {
      const result = await service.todo({ id: 999 });
      expect(result).toBeNull();
    });

    it('should return the todo if found', async () => {
      const created = await service.createTodo({ title: 'Test Todo' });
      const result = await service.todo({ id: created.id });
      expect(result).toEqual(created);
    });
  });

  describe('todos', () => {
    it('should return all todos', async () => {
      await service.createTodo({ title: 'Test Todo 1' });
      await service.createTodo({ title: 'Test Todo 2' });
      const result = await service.todos({});
      expect(result.length).toBe(2);
    });

    it('should support pagination (skip/take)', async () => {
      await service.createTodo({ title: 'Test Todo 1' });
      await service.createTodo({ title: 'Test Todo 2' });
      await service.createTodo({ title: 'Test Todo 3' });
      const result = await service.todos({ skip: 1, take: 1 });
      expect(result.length).toBe(1);
      expect(result[0].title).toBe('Test Todo 2');
    });
  });

  describe('createTodo', () => {
    it('should create a new todo', async () => {
      const todoData = { title: 'New Todo' };
      const result = await service.createTodo(todoData);
      expect(result.id).toBeDefined();
      expect(result.title).toBe(todoData.title);
      expect(result.isCompleted).toBe(false);
    });
  });

  describe('updateTodo', () => {
    it('should update an existing todo', async () => {
      const created = await service.createTodo({ title: 'Original Title' });
      const updateData = { isCompleted: true, title: 'Updated Title' };
      
      const result = await service.updateTodo({
        where: { id: created.id },
        data: updateData,
      });
      
      expect(result.id).toBe(created.id);
      expect(result.title).toBe(updateData.title);
      expect(result.isCompleted).toBe(true);
    });
  });

  describe('deleteTodo', () => {
    it('should delete a todo', async () => {
      const created = await service.createTodo({ title: 'To Be Deleted' });
      
      const result = await service.deleteTodo({ id: created.id });
      expect(result.id).toBe(created.id);
      
      const found = await service.todo({ id: created.id });
      expect(found).toBeNull();
    });
  });
});
