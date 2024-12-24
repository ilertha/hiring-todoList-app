import { createUser, getOneUser } from '../../services/user.service';
import { AppDataSouce } from '../../db';
import { UserEntity } from '../../entity';
import { Repository } from 'typeorm';

jest.mock('../../db', () => ({
  AppDataSouce: {
    getRepository: jest.fn(),
  },
}));

describe('UserService', () => {
  let mockRepository: Partial<Repository<UserEntity>>;

  beforeEach(() => {
    mockRepository = {
      findOne: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
    };

    (AppDataSouce.getRepository as jest.Mock).mockReturnValue(mockRepository);
  });

  describe('createUser', () => {
    it('should create a new user successfully', async () => {
      const userData = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
      };

      (mockRepository.findOne as jest.Mock).mockResolvedValue(null);
      (mockRepository.create as jest.Mock).mockReturnValue(userData);
      (mockRepository.save as jest.Mock).mockResolvedValue({ ...userData, uuid: 'test-uuid' });

      const result = await createUser(userData);

      expect(result).toEqual({ ...userData });
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { email: userData.email },
      });
    });

    it('should return null if user already exists', async () => {
      const userData = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123',
      };

      (mockRepository.findOne as jest.Mock).mockResolvedValue(userData);

      const result = await createUser(userData);

      expect(result).toBeNull();
    });
  });

  describe('getOneUser', () => {
    it('should return user if found', async () => {
      const userData = {
        uuid: 'test-uuid',
        username: 'testuser',
        email: 'test@example.com',
      };

      (mockRepository.findOne as jest.Mock).mockResolvedValue(userData);

      const result = await getOneUser({ email: userData.email });

      expect(result).toEqual(userData);
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { email: userData.email },
      });
    });

    it('should return null if user not found', async () => {
      (mockRepository.findOne as jest.Mock).mockResolvedValue(null);

      const result = await getOneUser({ email: 'nonexistent@example.com' });

      expect(result).toBeNull();
    });
  });
});