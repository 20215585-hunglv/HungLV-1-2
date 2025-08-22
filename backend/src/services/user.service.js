import userDao from '../daos/user.dao.js';

const createUserService = async ({ email, password }) => {
  // const existingUser = await userDao.findUser({ email });
  // if (existingUser) {
  //   const error = new Error('User already exists');
  //   error.statusCode = 409;
  //   throw error;
  // }

  const user = await userDao.createUser({ email, password });
  const userObj = user.toObject ? user.toObject() : user;
  delete userObj.password;
  return userObj;
};

const getUserService = async (id) => {
  const user = await userDao.findUser(id);
  if (!user) {
    const error = new Error('User not found');
    error.statusCode = 404;
    throw error;
  }

  const userObj = user.toObject ? user.toObject() : user;
  delete userObj.password;
  return userObj;
};

const getAllUserService = async () => {
  const users = await userDao.findAllUser();
  if (!users || users.length === 0) {
    const error = new Error('User not found');
    error.statusCode = 404;
    throw error;
  }
  return users.map((user) => {
    const userObj = user.toObject ? user.toObject() : user;
    delete userObj.password;
    return userObj;
  });
};

const updateUserService = async (id, updateData) => {
  const user = await userDao.updateUser(id, updateData);
  if (!user) {
    const error = new Error('User not found');
    error.statusCode = 404;
    throw error;
  }

  const userObj = user.toObject ? user.toObject() : user;
  delete userObj.password;
  return userObj;
};

const deleteUserService = async (id) => {
  const existingUser = await userDao.findUser(id);
  if (!existingUser) {
    const error = new Error('User not found');
    error.statusCode = 404;
    throw error;
  }

  const user = await userDao.deleteUser(id);
  return user;
};

const countDomainUsersService = async (domain) => {
  const count = await userDao.countDomainUsers(domain);
  return count;
};

const findListUserByDomainService = async (domain, offset, limit) => {
  const users = await userDao.findListUserByDomain(domain, offset, limit);
  return users.map((user) => {
    const userObj = user.toObject ? user.toObject() : user;
    delete userObj.password;
    return userObj;
  });
};

const statisticsDomainService = async () => {
  await userDao.statisticsDomain();
  return "MapReduce completed, results saved in 'domainstats'";
};

const deleteUserByDomainAndOffsetService = async (domain, offset, quantity) => {
  const deletedCount = await userDao.deleteUserByDomainAndOffset(
    domain,
    offset,
    quantity,
  );
  return deletedCount;
};

const findUserByOffsetService = async (offset, limit) => {
  const users = await userDao.findUserByOffset(offset, limit);
  if (!users || users.length === 0) {
    const error = new Error('no users found');
    error.statusCode = 404;
    throw error;
  }
  return users.map((user) => {
    const userObj = user.toObject ? user.toObject() : user;
    delete userObj.password;
    return userObj;
  });
};

const deleteUserByOffsetService = async (offset, limit) => {
  const deletedCount = await userDao.deleteUserByOffset(offset, limit);
  if (deletedCount === 0) {
    const error = new Error('no users found to delete');
    error.statusCode = 404;
    throw error;
  }
  return deletedCount;
};

const statisticsByDateService = async (fromDate, toDate) => {
  const stats = await userDao.statisticsByDate(fromDate, toDate);
  if (!stats || stats.length === 0) {
    const error = new Error('No statistics found for the given date range');
    error.statusCode = 404;
    throw error;
  }
  return stats;
};

const findUserByTimeService = async (fromDate, toDate) => {
  if (!fromDate || !toDate) {
    throw new Error('fromDate and toDate are required');
  }
  return userDao.findUserByTime(fromDate, toDate);
};

const getDomainStats = async () => {
  const rawResult = await userDao.getDomainStatsFromCollection();
  return rawResult;
};

export default {
  createUserService,
  getUserService,
  getAllUserService,
  updateUserService,
  deleteUserService,
  countDomainUsersService,
  findListUserByDomainService,
  statisticsDomainService,
  deleteUserByDomainAndOffsetService,
  findUserByOffsetService,
  deleteUserByOffsetService,
  statisticsByDateService,
  findUserByTimeService,
  getDomainStats,
};
