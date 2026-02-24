# NestJS Todo API - SonarQube Workshop Example

A robust and efficient Todo API built with [NestJS](https://nestjs.com/), [Prisma](https://www.prisma.io/), and [LibSQL](https://github.com/libsql/libsql) (SQLite), designed specifically as a target repository for SonarQube training and demonstrations.

## Description

This project provides a clean and scalable RESTful API for managing todos. **Its primary purpose is to serve as a practical, hands-on example for a SonarQube workshop.** It demonstrates modern backend development practices, including database ORM integration, API documentation with Swagger, and importantly, contains predefined code structures and test coverage (or lack thereof) ideal for exploring code quality analysis with SonarQube.

## Tech Stack

- **Framework:** [NestJS](https://nestjs.com/)
- **ORM:** [Prisma](https://www.prisma.io/)
- **Database:** [LibSQL](https://github.com/libsql/libsql) (SQLite)
- **API Documentation:** [Swagger](https://swagger.io/)
- **Testing:** [Jest](https://jestjs.io/)
- **Code Quality:** [SonarQube](https://www.sonarqube.org/)

## Project Structure

```text
src/
├── app.module.ts      # Root module
├── main.ts            # Application entry point
├── todo/              # Todo module
│   ├── todo.controller.ts
│   ├── todo.service.ts
│   └── todo.module.ts
└── prisma/            # Prisma client service
prisma/
└── schema.prisma      # Database schema
```

## Setup and Installation

### 1. Install Dependencies

```bash
npm install
```

### 2. Database Migration

Ensure your database is up to date:

```bash
npx prisma migrate dev
```

### 3. Environment Variables

Copy `.env.example` to `.env` and configure accordingly.

```bash
cp .env.example .env
```

## Running the App

```bash
# development
npm run start

# watch mode
npm run start:dev

# production mode
npm run start:prod
```

## API Endpoints & Swagger UI

Once the application is running, you can access the interactive API documentation (Swagger UI) at:

**[http://localhost:3000/api](http://localhost:3000/api)**

### Available Endpoints

- `GET /todos` - Get all todos
- `GET /todos/:id` - Get a todo by ID
- `POST /todos` - Create a new todo
- `PATCH /todos/:id` - Update an existing todo
- `DELETE /todos/:id` - Delete a todo

## Testing

```bash
# unit tests
npm run test

# test coverage
npm run test:cov
```

## SonarQube Integration

To run code quality analysis:

1. Ensure SonarQube is running locally or accessible.
2. Copy `sonar-project.example.properties` to `sonar-project.properties` and update the configuration.
3. Run the scanner (usually via `sonar-scanner`).

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
