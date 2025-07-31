import userDao from '../daos/user.dao.js';

const createUserService = async ({ email, password }) => {
  const existingUser = await userDao.findUser({ email });
  if (existingUser) {
    throw new Error('User already exists');
  }

  const user = await userDao.createUser({ email, password });
  return user;
};

const getUserService = async ({ email }) => {
  const user = await userDao.findUser({ email });
  if (!user) {
    throw new Error('User not found');
  }

  return user;
};

const updateUserService = async (id, updateData) => {
  const user = await userDao.updateUser(id, updateData);
  if (!user) {
    throw new Error('User not found');
  }

  return user;
};

const deleteUserService = async ({ email }) => {
  const existingUser = await userDao.findUser({ email });
  if (!existingUser) {
    throw new Error('User not found');
  }

  const user = await userDao.deleteUser({ email });
  return user;
};

const countDomainUsersService = async (domain) => {
  const count = await userDao.countDomainUsers(domain);
  return count;
};

const findListUserByDomainService = async (domain, offset, limit) => {
  const users = await userDao.findListUserByDomain(domain, offset, limit);
  return users;
};

const statisticsDomainService = async () => {
  const stats = await userDao.statisticsDomain();
  if (!stats || stats.length === 0) {
    throw new Error('No statistics available');
  }

  return stats;
};

const deleteUserByDomainAndOffsetService = async (domain, offset, quantity) => {
  const deletedCount = await userDao.deleteUserByDomainAndOffset(
    domain,
    offset,
    quantity,
  );
  return deletedCount;
};

export default {
  createUserService,
  getUserService,
  updateUserService,
  deleteUserService,
  countDomainUsersService,
  findListUserByDomainService,
  statisticsDomainService,
  deleteUserByDomainAndOffsetService,
};
