import { ListService } from '../../services/list.service';
import { AppDataSouce } from '../../db';
import { ListEntity } from '../../entity';
import { Repository, Between } from 'typeorm';

// Mock AppDataSource
jest.mock('../../db', () => ({
  AppDataSouce: {
    getRepository: jest.fn()
  }
}));

describe('ListService', () => {
  let listService: ListService;
  let mockRepository: any;
  const userId = 'test-user-id';
  const listId = 'test-list-id';

  beforeEach(() => {
    // Initialize mock repository
    mockRepository = {
      create: jest.fn(),
      save: jest.fn(),
      find: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      createQueryBuilder: jest.fn().mockReturnValue({
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        orderBy: jest.fn().mockReturnThis(),
        getMany: jest.fn()
      })
    };

    // Set up the mock repository
    (AppDataSouce.getRepository as jest.Mock).mockReturnValue(mockRepository);
    
    // Create a new instance of ListService
    listService = new ListService();
    
    // Mock console methods
    jest.spyOn(console, 'error').mockImplementation(() => {});
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createList', () => {
    it('should create a new list successfully', async () => {
      const listData = {
        title: 'Test List',
        description: 'Test Description'
      };
      const expectedList = {
        uuid: listId,
        ...listData,
        user: { uuid: userId }
      };

      mockRepository.create.mockReturnValue(expectedList);
      mockRepository.save.mockResolvedValue(expectedList);

      const result = await listService.createList(userId, listData);

      expect(mockRepository.create).toHaveBeenCalledWith({
        ...listData,
        user: { uuid: userId }
      });
      expect(result).toEqual(expectedList);
    });

    it('should throw error when creation fails', async () => {
      mockRepository.create.mockImplementation(() => {
        throw new Error('DB Error');
      });

      await expect(listService.createList(userId, { title: 'Test' }))
        .rejects
        .toThrow('Failed to create list');
    });
  });

  describe('getAllLists', () => {
    it('should return all lists for a user', async () => {
      const expectedLists = [
        { uuid: 'list-1', title: 'List 1' },
        { uuid: 'list-2', title: 'List 2' }
      ];

      mockRepository.find.mockResolvedValue(expectedLists);

      const result = await listService.getAllLists(userId);

      expect(mockRepository.find).toHaveBeenCalledWith({
        where: { user: { uuid: userId } },
        order: { createdAt: 'DESC' },
        relations: ['user']
      });
      expect(result).toEqual(expectedLists);
    });

    it('should handle empty results', async () => {
      mockRepository.find.mockResolvedValue([]);
      const result = await listService.getAllLists(userId);
      expect(result).toEqual([]);
    });

    it('should throw error when fetching fails', async () => {
      mockRepository.find.mockRejectedValue(new Error('DB Error'));

      await expect(listService.getAllLists(userId))
        .rejects
        .toThrow('Failed to fetch lists');
    });
  });

  describe('getListById', () => {
    it('should return a specific list', async () => {
      const expectedList = {
        uuid: listId,
        title: 'Test List',
        user: { uuid: userId }
      };

      mockRepository.findOne.mockResolvedValue(expectedList);

      const result = await listService.getListById(userId, listId);

      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { uuid: listId, user: { uuid: userId } },
        relations: ['user']
      });
      expect(result).toEqual(expectedList);
    });

    it('should return null if list not found', async () => {
      mockRepository.findOne.mockResolvedValue(null);
      const result = await listService.getListById(userId, listId);
      expect(result).toBeNull();
    });

    it('should throw error when fetching fails', async () => {
      mockRepository.findOne.mockRejectedValue(new Error('DB Error'));

      await expect(listService.getListById(userId, listId))
        .rejects
        .toThrow('Failed to fetch list');
    });
  });

  describe('updateList', () => {
    it('should update a list successfully', async () => {
      const updateData = { title: 'Updated Title' };
      const existingList = {
        uuid: listId,
        title: 'Old Title',
        user: { uuid: userId }
      };
      const updatedList = { ...existingList, ...updateData };

      mockRepository.findOne
        .mockResolvedValueOnce(existingList)
        .mockResolvedValueOnce(updatedList);
      mockRepository.update.mockResolvedValue({ affected: 1 });

      const result = await listService.updateList(userId, listId, updateData);

      expect(result).toEqual(updatedList);
      expect(mockRepository.update).toHaveBeenCalledWith(
        { uuid: listId, user: { uuid: userId } },
        updateData
      );
    });

    it('should throw error if list not found', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(listService.updateList(userId, listId, { title: 'New' }))
        .rejects
        .toThrow('Failed to update list');
    });

    it('should throw error when update fails', async () => {
      const existingList = {
        uuid: listId,
        title: 'Old Title',
        user: { uuid: userId }
      };

      mockRepository.findOne.mockResolvedValue(existingList);
      mockRepository.update.mockRejectedValue(new Error('DB Error'));

      await expect(listService.updateList(userId, listId, { title: 'New' }))
        .rejects
        .toThrow('Failed to update list');
    });
  });

  describe('deleteList', () => {
    it('should delete a list successfully', async () => {
      mockRepository.delete.mockResolvedValue({ affected: 1 });

      const result = await listService.deleteList(userId, listId);

      expect(mockRepository.delete).toHaveBeenCalledWith({
        uuid: listId,
        user: { uuid: userId }
      });
      expect(result).toBe(true);
    });

    it('should return false if no list was deleted', async () => {
      mockRepository.delete.mockResolvedValue({ affected: 0 });
      const result = await listService.deleteList(userId, listId);
      expect(result).toBe(false);
    });

    it('should throw error when deletion fails', async () => {
      mockRepository.delete.mockRejectedValue(new Error('DB Error'));

      await expect(listService.deleteList(userId, listId))
        .rejects
        .toThrow('Failed to delete list');
    });
  });

  describe('getImportantLists', () => {
    it('should return important lists', async () => {
      const importantLists = [
        { uuid: 'list-1', title: 'Important List', important: true }
      ];

      mockRepository.find.mockResolvedValue(importantLists);

      const result = await listService.getImportantLists(userId);

      expect(mockRepository.find).toHaveBeenCalledWith({
        where: { user: { uuid: userId }, important: true },
        order: { createdAt: 'DESC' },
        relations: ['user']
      });
      expect(result).toEqual(importantLists);
    });

    it('should throw error when fetching important lists fails', async () => {
      mockRepository.find.mockRejectedValue(new Error('DB Error'));

      await expect(listService.getImportantLists(userId))
        .rejects
        .toThrow('Failed to fetch important lists');
    });
  });

  describe('getCompletedLists', () => {
    it('should return completed lists', async () => {
      const completedLists = [
        { uuid: 'list-1', title: 'Completed List', completed: true }
      ];

      mockRepository.find.mockResolvedValue(completedLists);

      const result = await listService.getCompletedLists(userId);

      expect(mockRepository.find).toHaveBeenCalledWith({
        where: { user: { uuid: userId }, completed: true },
        order: { createdAt: 'DESC' },
        relations: ['user']
      });
      expect(result).toEqual(completedLists);
    });

    it('should throw error when fetching completed lists fails', async () => {
      mockRepository.find.mockRejectedValue(new Error('DB Error'));

      await expect(listService.getCompletedLists(userId))
        .rejects
        .toThrow('Failed to fetch completed lists');
    });
  });

  describe('toggleListComplete', () => {
    it('should toggle list completion status', async () => {
      const existingList = {
        uuid: listId,
        completed: false,
        user: { uuid: userId }
      };
      const updatedList = { ...existingList, completed: true };

      mockRepository.findOne
        .mockResolvedValueOnce(existingList)
        .mockResolvedValueOnce(existingList)
        .mockResolvedValueOnce(updatedList);
      mockRepository.update.mockResolvedValue({ affected: 1 });

      const result = await listService.toggleListComplete(userId, listId);

      expect(result).toEqual(updatedList);
      expect(mockRepository.update).toHaveBeenCalledWith(
        { uuid: listId, user: { uuid: userId } },
        { completed: true }
      );
    });

    it('should throw error if list not found', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(listService.toggleListComplete(userId, listId))
        .rejects
        .toThrow('Failed to toggle list completion');
    });
  });

  describe('toggleListImportance', () => {
    it('should toggle list importance', async () => {
      const existingList = {
        uuid: listId,
        important: false,
        user: { uuid: userId }
      };
      const updatedList = { ...existingList, important: true };

      mockRepository.findOne
        .mockResolvedValueOnce(existingList)
        .mockResolvedValueOnce(existingList)
        .mockResolvedValueOnce(updatedList);
      mockRepository.update.mockResolvedValue({ affected: 1 });

      const result = await listService.toggleListImportance(userId, listId);

      expect(result).toEqual(updatedList);
      expect(mockRepository.update).toHaveBeenCalledWith(
        { uuid: listId, user: { uuid: userId } },
        { important: true }
      );
    });

    it('should throw error if list not found', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(listService.toggleListImportance(userId, listId))
        .rejects
        .toThrow('Failed to toggle list importance');
    });
  });

  describe('getDueTodayLists', () => {
    it('should return lists due today', async () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      const dueTodayLists = [
        { uuid: 'list-1', title: 'Due Today List', duedate: today }
      ];

      mockRepository.find.mockResolvedValue(dueTodayLists);

      const result = await listService.getDueTodayLists(userId);

      expect(mockRepository.find).toHaveBeenCalledWith({
        where: {
          user: { uuid: userId },
          duedate: Between(today, tomorrow)
        },
        order: { createdAt: 'DESC' },
        relations: ['user']
      });
      expect(result).toEqual(dueTodayLists);
    });

    it('should throw error when fetching due today lists fails', async () => {
      mockRepository.find.mockRejectedValue(new Error('DB Error'));

      await expect(listService.getDueTodayLists(userId))
        .rejects
        .toThrow('Failed to fetch due today lists');
    });
  });

  describe('searchLists', () => {
    it('should search lists by title or description', async () => {
      const searchTerm = 'test';
      const expectedLists = [
        { uuid: 'list-1', title: 'Test List' }
      ];

      const mockQueryBuilder = mockRepository.createQueryBuilder();
      mockQueryBuilder.getMany.mockResolvedValue(expectedLists);

      const result = await listService.searchLists(userId, searchTerm);

      expect(mockRepository.createQueryBuilder).toHaveBeenCalledWith('list');
      expect(result).toEqual(expectedLists);
    });

    it('should handle empty search results', async () => {
      const mockQueryBuilder = mockRepository.createQueryBuilder();
      mockQueryBuilder.getMany.mockResolvedValue([]);

      const result = await listService.searchLists(userId, 'nonexistent');
      expect(result).toEqual([]);
    });

    it('should throw error when search fails', async () => {
      const mockQueryBuilder = mockRepository.createQueryBuilder();
      mockQueryBuilder.getMany.mockRejectedValue(new Error('DB Error'));

      await expect(listService.searchLists(userId, 'test'))
        .rejects
        .toThrow('Failed to search lists');
    });
  });
});