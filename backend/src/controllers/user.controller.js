import userService from '../services/user.service.js';

const createUserController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userService.createUserService({ email, password });
    res.status(201).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error creating user', error: error.message });
  }
};

const getUserController = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await userService.getUserService({ email });
    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error fetching user', error: error.message });
  }
};

const updateUserController = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const user = await userService.updateUserService(id, updateData);
    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error updating user', error: error.message });
  }
};

const deleteUserController = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await userService.deleteUserService({ email });
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error deleting user', error: error.message });
  }
};

const countDomainUsersController = async (req, res) => {
  try {
    const { domain } = req.body;
    const count = await userService.countDomainUsersService(domain);
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({
      message: 'Error counting users by domain',
      error: error.message,
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
    res.status(500).json({
      message: 'Error fetching users by domain',
      error: error.message,
    });
  }
};

const statisticsDomainController = async (req, res) => {
  try {
    const stats = await userService.statisticsDomainService();
    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching domain statistics',
      error: error.message,
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
    res.status(500).json({
      message: 'Error deleting users by domain and offset',
      error: error.message,
    });
  }
};

export default {
  createUserController,
  getUserController,
  updateUserController,
  deleteUserController,
  countDomainUsersController,
  findListUserByDomainController,
  statisticsDomainController,
  deleteUserByDomainAndOffsetController,
};
