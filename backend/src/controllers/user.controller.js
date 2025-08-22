import md5 from 'md5';
import userService from '../services/user.service.js';

const createUserController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userService.createUserService({ email, password });
    res.status(201).json(user);
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.message || 'Error create user',
    });
  }
};

const getUserController = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userService.getUserService(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.message || 'Error fetching user',
    });
  }
};

const getListUserController = async (req, res) => {
  try {
    const users = await userService.getAllUserService();
    res.status(200).json(users);
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.message || 'Error fetching users',
    });
  }
};

const updateUserController = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    if (updateData.password) {
      updateData.password = md5(updateData.password);
    }
    const user = await userService.updateUserService(id, updateData);
    res.status(200).json(user);
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.message || 'Error update user',
    });
  }
};

const deleteUserController = async (req, res) => {
  try {
    const { id } = req.params;
    console.log('Deleting user with ID:', id);
    const user = await userService.deleteUserService(id);

    res.status(200).json({ message: 'User deleted successfully' }, user);
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.message || 'Error delete user',
    });
  }
};

const countDomainUsersController = async (req, res) => {
  try {
    const { domain } = req.body;
    const count = await userService.countDomainUsersService(domain);
    res.status(200).json({ count });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.message || 'Error count domain',
    });
  }
};

const findListUserByDomainController = async (req, res) => {
  try {
    const { domain, offset, limit } = req.query;
    const users = await userService.findListUserByDomainService(
      domain,
      offset,
      limit,
    );
    res.status(200).json(users);
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.message || 'Error fetching user by domain',
    });
  }
};

const statisticsDomainController = async (req, res) => {
  try {
    const message = await userService.statisticsDomainService();
    res.status(200).json(message);
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.message || 'Error statistics domain',
    });
  }
};

const deleteUserByDomainAndOffsetController = async (req, res) => {
  try {
    const { domain, offset, quantity } = req.query;
    const deletedCount = await userService.deleteUserByDomainAndOffsetService(
      domain,
      parseInt(offset, 10),
      parseInt(quantity, 10),
    );
    res.status(200).json({ deletedCount });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.message || 'Error delete user by domain and offset',
    });
  }
};

const findUserByOffsetController = async (req, res) => {
  try {
    const { offset, limit } = req.query;
    const users = await userService.findUserByOffsetService(
      parseInt(offset, 10),
      parseInt(limit, 10),
    );
    res.status(200).json(users);
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.message || 'Error find user by offset',
    });
  }
};

const deleteUserByOffsetController = async (req, res) => {
  try {
    const { offset, limit } = req.query;
    const deletedCount = await userService.deleteUserByOffsetService(
      parseInt(offset, 10),
      parseInt(limit, 10),
    );
    res.status(200).json({ deletedCount });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.message || 'Error delete user by offset',
    });
  }
};

const statisticsByDateController = async (req, res) => {
  try {
    const { fromDate, toDate } = req.query;
    const stats = await userService.statisticsByDateService(fromDate, toDate);
    res.status(200).json(stats);
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.message || 'Error statistics by date',
    });
  }
};

const getOffsetController = async (req, res) => {
  try {
    const offset = await userService.getOffsetService();
    res.status(200).json(offset);
  } catch (error) {
    res.status(500).message('error get offset');
  }
};

const findUserByTimeController = async (req, res) => {
  try {
    const { fromDate, toDate } = req.query;
    const users = await userService.findUserByTimeService(fromDate, toDate);
    res.status(200).json(users);
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.message || 'Error fetching users by time',
    });
  }
};

const getDomainStats = async (req, res) => {
  try {
    const stats = await userService.getDomainStats();
    res.json(stats);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching domain statistics' });
  }
};

export default {
  createUserController,
  getUserController,
  getListUserController,
  updateUserController,
  deleteUserController,
  countDomainUsersController,
  findListUserByDomainController,
  statisticsDomainController,
  deleteUserByDomainAndOffsetController,
  findUserByOffsetController,
  deleteUserByOffsetController,
  statisticsByDateController,
  getOffsetController,
  findUserByTimeController,
  getDomainStats,
};
