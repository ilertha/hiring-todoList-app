import request from 'supertest';
import express from 'express';
import { listRouter } from '../../routes/listRouter';
import { listController } from '../../controllers/List/list.controller';
import { checkAuth } from '../../utils';

// Mock dependencies
jest.mock('../../utils', () => ({
  checkAuth: jest.fn((req, res, next) => next()),
}));

jest.mock('../../controllers/List/list.controller', () => ({
  listController: {
    createList: jest.fn((req, res) => res.json({ message: 'List created' })),
    getAllLists: jest.fn((req, res) => res.json({ lists: [] })),
    getImportantLists: jest.fn((req, res) => res.json({ lists: [] })),
    getCompletedLists: jest.fn((req, res) => res.json({ lists: [] })),
    getListById: jest.fn((req, res) => res.json({ list: {} })),
    updateList: jest.fn((req, res) => res.json({ message: 'List updated' })),
    deleteList: jest.fn((req, res) => res.json({ message: 'List deleted' })),
    toggleListComplete: jest.fn((req, res) => res.json({ message: 'List completion toggled' })),
    toggleListImportance: jest.fn((req, res) => res.json({ message: 'List importance toggled' })),
  },
}));

// Create express app for testing
const app = express();
app.use(express.json());
app.use('/lists', listRouter);

describe('List Router', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Authentication', () => {
    it('should use authentication middleware for all routes', async () => {
      await request(app).get('/lists');
      expect(checkAuth).toHaveBeenCalled();
    });
  });

  describe('POST /', () => {
    it('should create a new list', async () => {
      const response = await request(app)
        .post('/lists')
        .send({ title: 'New List' });

      expect(response.status).toBe(200);
      expect(listController.createList).toHaveBeenCalled();
    });
  });

  describe('GET /', () => {
    it('should get all lists', async () => {
      const response = await request(app).get('/lists');

      expect(response.status).toBe(200);
      expect(listController.getAllLists).toHaveBeenCalled();
    });
  });

  describe('GET /important', () => {
    it('should get important lists', async () => {
      const response = await request(app).get('/lists/important');

      expect(response.status).toBe(200);
      expect(listController.getImportantLists).toHaveBeenCalled();
    });
  });

  describe('GET /completed', () => {
    it('should get completed lists', async () => {
      const response = await request(app).get('/lists/completed');

      expect(response.status).toBe(200);
      expect(listController.getCompletedLists).toHaveBeenCalled();
    });
  });

  describe('GET /:id', () => {
    it('should get a list by id', async () => {
      const response = await request(app).get('/lists/123');

      expect(response.status).toBe(200);
      expect(listController.getListById).toHaveBeenCalled();
    });
  });

  describe('POST /:id', () => {
    it('should update a list', async () => {
      const response = await request(app)
        .post('/lists/123')
        .send({ title: 'Updated List' });

      expect(response.status).toBe(200);
      expect(listController.updateList).toHaveBeenCalled();
    });
  });

  describe('DELETE /:id', () => {
    it('should delete a list', async () => {
      const response = await request(app).delete('/lists/123');

      expect(response.status).toBe(200);
      expect(listController.deleteList).toHaveBeenCalled();
    });
  });

  describe('PATCH /:id/toggle-complete', () => {
    it('should toggle list completion status', async () => {
      const response = await request(app).patch('/lists/123/toggle-complete');

      expect(response.status).toBe(200);
      expect(listController.toggleListComplete).toHaveBeenCalled();
    });
  });

  describe('PATCH /:id/toggle-importance', () => {
    it('should toggle list importance status', async () => {
      const response = await request(app).patch('/lists/123/toggle-importance');

      expect(response.status).toBe(200);
      expect(listController.toggleListImportance).toHaveBeenCalled();
    });
  });

  describe('Error Handling', () => {
    it('should handle errors when controller throws an exception', async () => {
      // Mock one of the controllers to throw an error
      (listController.getAllLists as jest.Mock).mockImplementationOnce(() => {
        throw new Error('Test error');
      });

      const response = await request(app).get('/lists');
      expect(response.status).toBe(500);
    });
  });
});