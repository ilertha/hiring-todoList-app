import { Request, Response, NextFunction } from 'express';
import { loginController, registerController } from '../../controllers/Auth';
import { userService } from '../../services';
import { generateToken } from '../../utils/generate';
import * as passwordUtils from '../../utils/password';
import { encryptPassword } from '../../utils';
import httpStatus from 'http-status';

// Mock the services and utilities
jest.mock('../../services', () => ({
  userService: {
    getOneUser: jest.fn(),
    createUser: jest.fn()
  }
}));

jest.mock('../../utils/generate', () => ({
  generateToken: jest.fn()
}));

jest.mock('../../utils/password', () => ({
  comparePassword: jest.fn(),
  encryptPassword: jest.fn()
}));

describe('Auth Controllers', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: jest.Mock;
  
  const mockUser = {
    uuid: 'test-uuid',
    username: 'testuser',
    email: 'test@example.com',
    password: 'hashedPassword123'
  };

  beforeEach(() => {
    mockRequest = {
      body: {}
    };
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    };
    mockNext = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Login Controller', () => {
    beforeEach(() => {
      mockRequest.body = {
        email: 'test@example.com',
        password: 'password123'
      };
    });

    it('should successfully login a user', async () => {
      (userService.getOneUser as jest.Mock).mockResolvedValue(mockUser);
      (passwordUtils.comparePassword as jest.Mock).mockResolvedValue(true);
      (generateToken as jest.Mock).mockReturnValue('test-token');

      await loginController(mockRequest as Request, mockResponse as Response, mockNext);

      expect(userService.getOneUser).toHaveBeenCalledWith({ 
        email: mockRequest.body.email 
      });
      expect(passwordUtils.comparePassword).toHaveBeenCalledWith(
        mockRequest.body.password,
        mockUser.password
      );
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        token: 'test-token',
        uuid: mockUser.uuid
      });
    });

    it('should return 404 if user not found', async () => {
      (userService.getOneUser as jest.Mock).mockResolvedValue(null);

      await loginController(mockRequest as Request, mockResponse as Response, mockNext);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: 'User not found!'
      });
    });

    it('should return 401 if password is incorrect', async () => {
      (userService.getOneUser as jest.Mock).mockResolvedValue(mockUser);
      (passwordUtils.comparePassword as jest.Mock).mockResolvedValue(false);

      await loginController(mockRequest as Request, mockResponse as Response, mockNext);

      expect(mockResponse.status).toHaveBeenCalledWith(401);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: 'Password is incorrect!'
      });
    });
  });

  describe('Register Controller', () => {
    beforeEach(() => {
      mockRequest.body = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123'
      };
    });

    it('should successfully register a new user', async () => {
      const hashedPassword = 'hashedPassword123';
      (encryptPassword as jest.Mock)(hashedPassword);
      (userService.createUser as jest.Mock).mockResolvedValue(mockUser);
      const hashPassword = await encryptPassword(hashedPassword);
      await registerController(mockRequest as Request, mockResponse as Response, mockNext);

      // expect(hashPassword).toHaveBeenCalledWith(mockRequest.body.password);
      // expect(userService.createUser).toHaveBeenCalledWith({
      //   username: mockRequest.body.username,
      //   email: mockRequest.body.email,
      //   password: hashPassword
      // });
      expect(mockResponse.json).toHaveBeenCalledWith({ user: mockUser });
    });

    it('should handle missing fields', async () => {
      mockRequest.body = {
        email: 'test@example.com',
        // missing username and password
      };

      await registerController(mockRequest as Request, mockResponse as Response, mockNext);

      expect(mockNext).toHaveBeenCalledWith(expect.any(Error));
    });

    it('should handle duplicate email registration', async () => {
      (encryptPassword as jest.Mock)('hashedPassword123');
      (userService.createUser as jest.Mock).mockRejectedValue(new Error('User already exists'));

      await registerController(mockRequest as Request, mockResponse as Response, mockNext);

      expect(mockNext).toHaveBeenCalledWith(expect.any(Error));
    });

    
  });
});