/**
 * @jest-environment node
 */
import { testApiHandler } from 'next-test-api-route-handler';
import * as appHandler from './route';
import mongoose from 'mongoose';
import Topic from '@/models/topic';

let topicId;

// Connect to the test database before running tests
beforeAll(async () => {
  await mongoose.connect('mongodb://localhost:27018/testdb');
});

// Clean up after each test
afterEach(async () => {
  await Topic.deleteMany({});
});

// Disconnect from the database after all tests
afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await new Promise((resolve) => setTimeout(resolve, 500)); // Wait for internal timers to finish
});

describe('/api/topics/[id] route', () => {
  describe('GET', () => {
    it('should retrieve the topic by ID', async () => {
      const topic = await Topic.create({
        title: 'Sample Topic',
        description: 'This is a sample topic.',
        dueDate: '2025-05-15',
      });
      topicId = topic._id.toString();
      await testApiHandler({
        appHandler,
        params: { id: topicId },
        url: `http://localhost/api/topics/${topicId}`,
        test: async ({ fetch }) => {
          const res = await fetch({ method: 'GET' });
          expect(res.status).toBe(200);
          const data = await res.json();
          expect(data.topic.title).toBe('Sample Topic');
        },
      });
    });

    it('should return 400 for invalid ID format', async () => {
      await testApiHandler({
        appHandler,
        params: { id: 'invalid-id' },
        url: 'http://localhost/api/topics/invalid-id',
        test: async ({ fetch }) => {
          const res = await fetch({ method: 'GET' });
          expect(res.status).toBe(400);
          const data = await res.json();
          expect(data.error).toMatch(/Invalid topic ID/i);
        },
      });
    });

    it('should return 404 for non-existent ID', async () => {
      const nonExistentId = new mongoose.Types.ObjectId().toString();
      await testApiHandler({
        appHandler,
        params: { id: nonExistentId },
        url: `http://localhost/api/topics/${nonExistentId}`,
        test: async ({ fetch }) => {
          const res = await fetch({ method: 'GET' });
          expect(res.status).toBe(404);
          const data = await res.json();
          expect(data.error).toMatch(/Topic not found/i);
        },
      });
    });
  });

  describe('PUT', () => {
    it('should update the topic successfully', async () => {
      const topic = await Topic.create({
        title: 'Sample Topic',
        description: 'This is a sample topic.',
        dueDate: '2025-05-15',
      });
      topicId = topic._id.toString();
      await testApiHandler({
        appHandler,
        params: { id: topicId },
        url: `http://localhost/api/topics/${topicId}`,
        test: async ({ fetch }) => {
          const res = await fetch({
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              title: 'Updated Title',
              description: 'Updated Description',
              dueDate: '2025-06-01',
            }),
          });
          expect(res.status).toBe(200);

          const data = await res.json();
          expect(data.message).toBe('Topic updated');
        },
      });
    });

    it('should return 400 for missing title', async () => {
      const topic = await Topic.create({
        title: 'Sample Topic',
        description: 'This is a sample topic.',
        dueDate: '2025-05-15',
      });
      topicId = topic._id.toString();
      await testApiHandler({
        appHandler,
        params: { id: topicId },
        url: `http://localhost/api/topics/${topicId}`,
        test: async ({ fetch }) => {
          const res = await fetch({
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              description: 'No title provided',
              dueDate: '2025-06-01',
            }),
          });
          expect(res.status).toBe(400);
          const data = await res.json();
          expect(data.error).toMatch(/Title is required/i);
        },
      });
    });

    it('should return 400 for missing description', async () => {
      const topic = await Topic.create({
        title: 'Sample Topic',
        description: 'This is a sample topic.',
        dueDate: '2025-05-15',
      });
      topicId = topic._id.toString();
      await testApiHandler({
        appHandler,
        params: { id: topicId },
        url: `http://localhost/api/topics/${topicId}`,
        test: async ({ fetch }) => {
          const res = await fetch({
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              title: 'No description provided',
              dueDate: '2025-06-01',
            }),
          });
          expect(res.status).toBe(400);
          const data = await res.json();
          expect(data.error).toMatch(/Description is required/i);
        },
      });
    });

    it('should return 400 for invalid due date', async () => {
      const topic = await Topic.create({
        title: 'Sample Topic',
        description: 'This is a sample topic.',
        dueDate: '2025-05-15',
      });
      topicId = topic._id.toString();
      await testApiHandler({
        appHandler,
        params: { id: topicId },
        url: `http://localhost/api/topics/${topicId}`,
        test: async ({ fetch }) => {
          const res = await fetch({
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              title: 'New title',
              description: 'New description',
              dueDate: 'invalid date format',
            }),
          });
          expect(res.status).toBe(400);
          const data = await res.json();
          expect(data.error).toMatch(/Due date is required and must be a valid date/i);
        },
      });
    });
    
    it('should return 404 for non-existent ID', async () => {
      const nonExistentId = new mongoose.Types.ObjectId().toString();
      await testApiHandler({
        appHandler,
        params: { id: nonExistentId },
        url: `http://localhost/api/topics/${nonExistentId}`,
        test: async ({ fetch }) => {
          const res = await fetch({
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              title: 'New Title',
              description: 'New Description',
              dueDate: '2025-06-01',
            }),
          });
          expect(res.status).toBe(404);
          const data = await res.json();
          expect(data.error).toMatch(/Topic not found/i);
        },
      });
    });
  });

  describe('DELETE', () => {
    it('should delete the topic successfully', async () => {
      const topic = await Topic.create({
        title: 'Sample Topic',
        description: 'This is a sample topic.',
        dueDate: '2025-05-15',
      });
      topicId = topic._id.toString();
      await testApiHandler({
        appHandler,
        params: { id: topicId },
        url: `http://localhost/api/topics/${topicId}`,
        test: async ({ fetch }) => {
          const res = await fetch({ method: 'DELETE' });
          expect(res.status).toBe(200);
          const data = await res.json();
          expect(data.message).toBe('Topic deleted');
        },
      });
    });

    it('should return 404 for non-existent ID', async () => {
      const nonExistentId = new mongoose.Types.ObjectId().toString();
      await testApiHandler({
        appHandler,
        params: { id: nonExistentId },
        url: `http://localhost/api/topics/${nonExistentId}`,
        test: async ({ fetch }) => {
          const res = await fetch({ method: 'DELETE' });
          expect(res.status).toBe(404);
          const data = await res.json();
          expect(data.error).toMatch(/Topic not found/i);
        },
      });
    });
  });
});
