import { describe, it, expect, vi, beforeEach } from 'vitest';
import userService from '../services/user.service.js';
import userDao from '../daos/user.dao.js';

vi.mock('../daos/user.dao.js'); // mock toàn bộ DAO

describe('User Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('createUserService', () => {
    it('should create user and remove password', async () => {
      const fakeUser = {
        email: 'hung@test.com',
        password: '123456',
        toObject: () => ({ email: 'hung@test.com', password: '123456' }),
      };
      userDao.createUser.mockResolvedValue(fakeUser);

      const input = { email: 'hung@test.com', password: '123456' };
      const result = await userService.createUserService(input);

      expect(userDao.createUser).toHaveBeenCalledWith(input);
      expect(result).toEqual({ email: 'hung@test.com' });
      expect(result).not.toHaveProperty('password');
    });
  });

  describe('getUserService', () => {
    it('should return user without password if found', async () => {
      const fakeUser = {
        email: 'hung@test.com',
        password: '123456',
        toObject: () => ({ email: 'hung@test.com', password: '123456' }),
      };
      userDao.findUser.mockResolvedValue(fakeUser);

      const result = await userService.getUserService('1');
      expect(userDao.findUser).toHaveBeenCalledWith('1');
      expect(result).toEqual({ email: 'hung@test.com' });
      expect(result).not.toHaveProperty('password');
    });

    it('should throw 404 error if user not found', async () => {
      userDao.findUser.mockResolvedValue(null);
      await expect(userService.getUserService('1')).rejects.toMatchObject({
        message: 'User not found',
        statusCode: 404,
      });
    });
  });

  describe('getAllUserService', () => {
    it('should return all users without passwords', async () => {
      const fakeUsers = [
        {
          email: 'u1@test.com',
          password: '111',
          toObject: () => ({ email: 'u1@test.com', password: '111' }),
        },
        {
          email: 'u2@test.com',
          password: '222',
          toObject: () => ({ email: 'u2@test.com', password: '222' }),
        },
      ];
      userDao.findAllUser.mockResolvedValue(fakeUsers);

      const result = await userService.getAllUserService();

      expect(userDao.findAllUser).toHaveBeenCalled();
      expect(result).toEqual([
        { email: 'u1@test.com' },
        { email: 'u2@test.com' },
      ]);
      result.forEach((u) => expect(u).not.toHaveProperty('password'));
    });

    it('should throw 404 error if no users found', async () => {
      userDao.findAllUser.mockResolvedValue([]);
      await expect(userService.getAllUserService()).rejects.toMatchObject({
        message: 'User not found',
        statusCode: 404,
      });
    });
  });

  describe('updateUserService', () => {
    it('should update user and remove password', async () => {
      const fakeUser = {
        email: 'updated@test.com',
        password: '123456',
        toObject: () => ({ email: 'updated@test.com', password: '123456' }),
      };
      userDao.updateUser.mockResolvedValue(fakeUser);

      const result = await userService.updateUserService('123', {
        email: 'updated@test.com',
      });

      expect(userDao.updateUser).toHaveBeenCalledWith('123', {
        email: 'updated@test.com',
      });
      expect(result).toEqual({ email: 'updated@test.com' });
      expect(result).not.toHaveProperty('password');
    });

    it('should throw 404 if user not found', async () => {
      userDao.updateUser.mockResolvedValue(null);

      await expect(
        userService.updateUserService('123', { email: 'updated@test.com' }),
      ).rejects.toMatchObject({
        message: 'User not found',
        statusCode: 404,
      });
    });
  });
  describe('deleteUserService', () => {
    it('should delete user if exists', async () => {
      const fakeUser = { email: 'deleted@test.com' };
      userDao.findUser.mockResolvedValue(fakeUser);
      userDao.deleteUser.mockResolvedValue(fakeUser);

      const result = await userService.deleteUserService('123');

      expect(userDao.findUser).toHaveBeenCalledWith('123');
      expect(userDao.deleteUser).toHaveBeenCalledWith('123');
      expect(result).toBe(fakeUser);
    });

    it('should throw 404 if user does not exist', async () => {
      userDao.findUser.mockResolvedValue(null);

      await expect(userService.deleteUserService('123')).rejects.toMatchObject({
        message: 'User not found',
        statusCode: 404,
      });
    });
  });
});
