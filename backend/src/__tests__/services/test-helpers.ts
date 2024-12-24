export const createMockRepository = () => ({
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
});

export const createTestList = (overrides = {}) => ({
  uuid: 'test-list-id',
  title: 'Test List',
  description: 'Test Description',
  completed: false,
  important: false,
  user: { uuid: 'test-user-id' },
  ...overrides
});