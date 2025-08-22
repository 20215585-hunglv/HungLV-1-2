import exportService from '../services/export.service.js';

const exportUsersController = async (req, res) => {
  try {
    const { from, to } = req.query;
    const userId = req.user._id;

    const csv = await exportService.exportUsersService(userId, from, to);

    res.send(csv);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default {
  exportUsersController,
};
