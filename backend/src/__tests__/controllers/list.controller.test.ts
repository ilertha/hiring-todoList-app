import { Request, Response } from 'express';
import { ListController } from '../../controllers/List/list.controller';
import { listService } from '../../services/list.service';

// Mock the list service
jest.mock('../../services/list.service');

describe('ListController', () => {
  let listController: ListController;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockUser = { uuid: 'test-user-id' };

  beforeEach(() => {
    listController = new ListController();
    mockRequest = {
      user: mockUser,
      params: {},
      body: {}
    };
    mockResponse = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };
  });

  describe('createList', () => {
    it('should create a new list successfully', async () => {
      const mockList = { id: 1, title: 'Test List' };
      (listService.createList as jest.Mock).mockResolvedValue(mockList);

      await listController.createList(mockRequest as Request, mockResponse as Response);

      expect(listService.createList).toHaveBeenCalledWith(mockUser.uuid, mockRequest.body);
      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith(mockList);
    });

    it('should handle errors when creating a list', async () => {
      (listService.createList as jest.Mock).mockRejectedValue(new Error('Database error'));

      await listController.createList(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Error creating list' });
    });
  });

  describe('getAllLists', () => {
    it('should get all lists successfully', async () => {
      const mockLists = [{ id: 1, title: 'List 1' }, { id: 2, title: 'List 2' }];
      (listService.getAllLists as jest.Mock).mockResolvedValue(mockLists);

      await listController.getAllLists(mockRequest as Request, mockResponse as Response);

      expect(listService.getAllLists).toHaveBeenCalledWith(mockUser.uuid);
      expect(mockResponse.json).toHaveBeenCalledWith(mockLists);
    });

    it('should handle errors when fetching lists', async () => {
      (listService.getAllLists as jest.Mock).mockRejectedValue(new Error('Database error'));

      await listController.getAllLists(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Error fetching lists' });
    });
  });

  describe('getListById', () => {
    it('should get a specific list successfully', async () => {
      const mockList = { id: 1, title: 'Test List' };
      mockRequest.params = { id: '1' };
      (listService.getListById as jest.Mock).mockResolvedValue(mockList);

      await listController.getListById(mockRequest as Request, mockResponse as Response);

      expect(listService.getListById).toHaveBeenCalledWith(mockUser.uuid, '1');
      expect(mockResponse.json).toHaveBeenCalledWith(mockList);
    });

    it('should return 404 when list is not found', async () => {
      mockRequest.params = { id: '999' };
      (listService.getListById as jest.Mock).mockResolvedValue(null);

      await listController.getListById(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'List not found' });
    });
  });

  describe('updateList', () => {
    it('should update a list successfully', async () => {
      const mockUpdatedList = { id: 1, title: 'Updated List' };
      mockRequest.params = { id: '1' };
      mockRequest.body = { title: 'Updated List' };
      (listService.updateList as jest.Mock).mockResolvedValue(mockUpdatedList);

      await listController.updateList(mockRequest as Request, mockResponse as Response);

      expect(listService.updateList).toHaveBeenCalledWith(mockUser.uuid, '1', mockRequest.body);
      expect(mockResponse.json).toHaveBeenCalledWith(mockUpdatedList);
    });

    it('should return 404 when updating non-existent list', async () => {
      mockRequest.params = { id: '999' };
      (listService.updateList as jest.Mock).mockResolvedValue(null);

      await listController.updateList(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'List not found' });
    });
  });

  describe('deleteList', () => {
    it('should delete a list successfully', async () => {
      mockRequest.params = { id: '1' };
      (listService.deleteList as jest.Mock).mockResolvedValue(true);

      await listController.deleteList(mockRequest as Request, mockResponse as Response);

      expect(listService.deleteList).toHaveBeenCalledWith(mockUser.uuid, '1');
      expect(mockResponse.status).toHaveBeenCalledWith(204);
      expect(mockResponse.send).toHaveBeenCalled();
    });

    it('should return 404 when deleting non-existent list', async () => {
      mockRequest.params = { id: '999' };
      (listService.deleteList as jest.Mock).mockResolvedValue(false);

      await listController.deleteList(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: 'List not found' });
    });
  });

  describe('getImportantLists', () => {
    it('should get important lists successfully', async () => {
      const mockImportantLists = [{ id: 1, title: 'Important List', important: true }];
      (listService.getImportantLists as jest.Mock).mockResolvedValue(mockImportantLists);

      await listController.getImportantLists(mockRequest as Request, mockResponse as Response);

      expect(listService.getImportantLists).toHaveBeenCalledWith(mockUser.uuid);
      expect(mockResponse.json).toHaveBeenCalledWith(mockImportantLists);
    });
  });

  describe('getCompletedLists', () => {
    it('should get completed lists successfully', async () => {
      const mockCompletedLists = [{ id: 1, title: 'Completed List', completed: true }];
      (listService.getCompletedLists as jest.Mock).mockResolvedValue(mockCompletedLists);

      await listController.getCompletedLists(mockRequest as Request, mockResponse as Response);

      expect(listService.getCompletedLists).toHaveBeenCalledWith(mockUser.uuid);
      expect(mockResponse.json).toHaveBeenCalledWith(mockCompletedLists);
    });
  });

  describe('toggleListComplete', () => {
    it('should toggle list completion status successfully', async () => {
      const mockToggledList = { id: 1, title: 'Test List', completed: true };
      mockRequest.params = { id: '1' };
      (listService.toggleListComplete as jest.Mock).mockResolvedValue(mockToggledList);

      await listController.toggleListComplete(mockRequest as Request, mockResponse as Response);

      expect(listService.toggleListComplete).toHaveBeenCalledWith(mockUser.uuid, '1');
      expect(mockResponse.json).toHaveBeenCalledWith(mockToggledList);
    });
  });

  describe('toggleListImportance', () => {
    it('should toggle list importance status successfully', async () => {
      const mockToggledList = { id: 1, title: 'Test List', important: true };
      mockRequest.params = { id: '1' };
      (listService.toggleListImportance as jest.Mock).mockResolvedValue(mockToggledList);

      await listController.toggleListImportance(mockRequest as Request, mockResponse as Response);

      expect(listService.toggleListImportance).toHaveBeenCalledWith(mockUser.uuid, '1');
      expect(mockResponse.json).toHaveBeenCalledWith(mockToggledList);
    });
  });
});