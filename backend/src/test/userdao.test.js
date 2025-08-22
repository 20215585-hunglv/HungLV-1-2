import { describe, it, expect, vi, beforeEach } from 'vitest';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import userDao from '../daos/user.dao.js';
import User from '../models/user.model.js';

vi.mock('../models/user.model.js', () => ({
  default: {
    create: vi.fn(),
    findById: vi.fn(),
    findOne: vi.fn(),
    find: vi.fn(),
    findByIdAndUpdate: vi.fn(),
    findByIdAndDelete: vi.fn(),
  },
}));

describe('User DAO (mocked)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('createUser ', async () => {
    const mockUser = { email: 'hung@example.com', password: 'hashed' };
    User.create.mockResolvedValue(mockUser);

    const result = await userDao.createUser({
      email: 'hung@example.com',
      password: '123456',
    });

    const args = User.create.mock.calls[0][0];
    expect(args.email).toBe('hung@example.com');
    expect(bcrypt.compareSync('123456', args.password)).toBe(true);

    expect(result).toBe(mockUser);
  });

  it('findUserById ', async () => {
    const fakeUser = {
      email: 'hung1@test.com',
      password: 'hashed',
      role: 'user',
    };
    User.findById.mockResolvedValue(fakeUser);

    const validId = new mongoose.Types.ObjectId().toString();
    const result = await userDao.findUser(validId);

    expect(User.findById).toHaveBeenCalledWith(validId);
    expect(result).toBe(fakeUser);
  });

  it('findUser', async () => {
    const fakeUser = {
      email: 'hung1@test.com',
      password: 'hashed',
      role: 'user',
    };
    User.findOne.mockResolvedValue(fakeUser);

    const condition = { email: 'hung2@test.com' };
    const result = await userDao.findUser(condition);

    expect(User.findOne).toHaveBeenCalledWith(condition);
    expect(result).toBe(fakeUser);
  });

  it('findAllUser', async () => {
    const fakeUsers = [{ email: 'u1@test.com' }, { email: 'u2@test.com' }];
    User.find.mockResolvedValue(fakeUsers);

    const result = await userDao.findAllUser();

    expect(User.find).toHaveBeenCalledWith({});
    expect(result).toBe(fakeUsers);
  });

  it('updateUser', async () => {
    const fakeUser = { email: 'updated@test.com', domain: 'test.com' };
    User.findByIdAndUpdate.mockResolvedValue(fakeUser);

    const result = await userDao.updateUser('123', {
      email: 'updated@test.com',
    });

    expect(User.findByIdAndUpdate).toHaveBeenCalledWith(
      '123',
      { email: 'updated@test.com' },
      { new: true },
    );
    expect(result).toBe(fakeUser);
  });
  it('deleteUser', async () => {
    const fakeUser = { email: 'admin@gmail.com' };
    User.findByIdAndDelete.mockResolvedValue(fakeUser);
    const result = await userDao.deleteUser('123');
    expect(User.findByIdAndDelete).toHaveBeenCalledWith('123');
    expect(result).toBe(fakeUser);
  });
});
