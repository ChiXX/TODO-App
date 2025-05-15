/**
 * @jest-environment node
 */
import { testApiHandler } from 'next-test-api-route-handler';
import * as appHandler from './route';
import mongoose from 'mongoose';
import Topic from '@/models/topic';

// Connect once before all tests
beforeAll(async () => {
  await mongoose.connect('mongodb://localhost:27018/testdb');
});

// Clear DB between tests
afterEach(async () => {
  await Topic.deleteMany({});
});

// Disconnect and allow cleanup
afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await new Promise((resolve) => setTimeout(resolve, 500)); // Wait for internal timers to finish
});

describe('POST /api/topics', () => {
  it('should create a new topic', async () => {
    await testApiHandler({
      appHandler,
      test: async ({ fetch }) => {
        const response = await fetch({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: 'Test Title',
            description: 'Test Description',
            dueDate: '2025-05-15',
          }),
        });

        expect(response.status).toBe(201);
        const data = await response.json();
        expect(data.message).toBe('Topic Created');
      },
    });
  });

  it('should return 400 if title is missing', async () => {
    await testApiHandler({
      appHandler,
      test: async ({ fetch }) => {
        const res = await fetch({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            description: 'No title',
            dueDate: '2025-05-15',
          }),
        });
        expect(res.status).toBe(400);
        const data = await res.json();
        expect(data.error).toMatch(/title/i);
      },
    });
  });

  it('should return 400 if dueDate is invalid', async () => {
    await testApiHandler({
      appHandler,
      test: async ({ fetch }) => {
        const res = await fetch({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: 'Bad Date',
            description: 'This has an invalid date',
            dueDate: 'not-a-date',
          }),
        });
        expect(res.status).toBe(400);
        const data = await res.json();
        expect(data.error).toMatch(/due date/i);
      },
    });
  });
});

describe('GET /api/topics', () => {
  it('should return paginated topics', async () => {
    await Topic.insertMany([
      { title: 'Alpha', description: 'First', dueDate: '2025-06-01' },
      { title: 'Beta', description: 'Second', dueDate: '2025-06-02' },
      { title: 'Gamma', description: 'Third', dueDate: '2025-06-03' },
    ]);
    await testApiHandler({
      appHandler,
      test: async ({ fetch }) => {
        const res = await fetch({
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        expect(res.status).toBe(200);
        const data = await res.json();

        expect(data.topics.length).toBe(3);
        expect(data.totalItemsInDb).toBe(3);
        expect(data.pagination.totalItems).toBe(3);
        expect(data.pagination.totalPages).toBe(1);
        expect(data.pagination.currentPage).toBe(1);
        expect(data.pagination.pageSize).toBe(5);
      },
    });
  });

  it('should search topics by title/description', async () => {
    await Topic.insertMany([
      { title: 'Alpha', description: 'First', dueDate: '2025-06-01' },
      { title: 'Beta', description: 'Second', dueDate: '2025-06-02' },
      { title: 'Gamma', description: 'Third', dueDate: '2025-06-03' },
    ]);
    await testApiHandler({
      appHandler,
      url: '/api/topics?search=Gamma',
      test: async ({ fetch }) => {
        const res = await fetch({
          method: 'GET',
          url: '/api/topics?search=Gamma',
        });
        const data = await res.json();

        expect(data.topics.length).toBe(1);
        expect(data.topics[0].title).toBe('Gamma');
      },
    });
  });

  it('should validate invalid sortBy', async () => {
    await Topic.insertMany([
      { title: 'Alpha', description: 'First', dueDate: '2025-06-01' },
      { title: 'Beta', description: 'Second', dueDate: '2025-06-02' },
      { title: 'Gamma', description: 'Third', dueDate: '2025-06-03' },
    ]);
    await testApiHandler({
      appHandler,
      url: '/api/topics?sortBy=invalidField',
      test: async ({ fetch }) => {
        const res = await fetch({
          method: 'GET',
          url: '/api/topics?sortBy=invalidField',
        });
        expect(res.status).toBe(400);
        const data = await res.json();
        expect(data.error).toMatch(/Invalid sortBy/);
      },
    });
  });

  it('should validate invalid page number', async () => {
    await Topic.insertMany([
      { title: 'Alpha', description: 'First', dueDate: '2025-06-01' },
      { title: 'Beta', description: 'Second', dueDate: '2025-06-02' },
      { title: 'Gamma', description: 'Third', dueDate: '2025-06-03' },
    ]);
    await testApiHandler({
      appHandler,
      url: '/api/topics?page=100',
      test: async ({ fetch }) => {
        const res = await fetch({
          method: 'GET',
          url: '/api/topics?page=100',
        });
        expect(res.status).toBe(400);
        const data = await res.json();
        expect(data.error).toMatch(/Invalid page number/);
      },
    });
  });
});
