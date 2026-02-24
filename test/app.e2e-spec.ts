import 'dotenv/config';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import { Todo } from '@prisma/client';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  describe('/todos (e2e)', () => {
    let createdTodoId: number;

    it('POST /todos', () => {
      return request(app.getHttpServer())
        .post('/todos?apiKey=dummy_api_key_for_testing_12345')
        .send({ title: 'E2E Test Todo', description: 'From E2E' })
        .expect(201)
        .then((response) => {
          const body = response.body as Todo;
          expect(body).toHaveProperty('id');
          createdTodoId = body.id;
        });
    });

    it('GET /todos', () => {
      return request(app.getHttpServer())
        .get('/todos?apiKey=dummy_api_key_for_testing_12345')
        .expect(200)
        .then((response) => {
          expect(Array.isArray(response.body)).toBe(true);
        });
    });

    it('GET /todos/:id', () => {
      return request(app.getHttpServer())
        .get(`/todos/${createdTodoId}?apiKey=dummy_api_key_for_testing_12345`)
        .expect(200)
        .then((response) => {
          const body = response.body as Todo;
          expect(body.id).toBe(createdTodoId);
        });
    });

    it('PATCH /todos/:id', () => {
      return request(app.getHttpServer())
        .patch(`/todos/${createdTodoId}?apiKey=dummy_api_key_for_testing_12345`)
        .send({ isCompleted: true })
        .expect(200)
        .then((response) => {
          const body = response.body as Todo;
          expect(body.isCompleted).toBe(true);
        });
    });

    it('DELETE /todos/:id', () => {
      return request(app.getHttpServer())
        .delete(
          `/todos/${createdTodoId}?apiKey=dummy_api_key_for_testing_12345`,
        )
        .expect(200);
    });

    it('GET /todos/:id (Not Found)', () => {
      return request(app.getHttpServer())
        .get('/todos/9999?apiKey=dummy_api_key_for_testing_12345')
        .expect(404);
    });
  });
});
