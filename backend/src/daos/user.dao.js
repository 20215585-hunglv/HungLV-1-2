import User from '../models/user.model.js';
import mongoose from 'mongoose';
const ObjectId = mongoose.Types.ObjectId;

const createUser = async ({ email, password }) => {
  const user = User.create({ email, password });
  return user;
};

const findUser = async (condition) => {
  if (ObjectId.isValid(condition)) {
    const user = await User.findById(condition);
    return user;
  }

  if (typeof condition === 'object' && condition !== null) {
    const user = await User.findOne(condition);
    return user;
  }

  return null;
};

const updateUser = async (id, updateData) => {
  const user = await User.findByIdAndUpdate(id, updateData, { new: true });
  return user;
};

const deleteUser = async ({ email }) => {
  const user = await User.deleteOne({ email });
  return user;
};

const countDomainUsers = async (domain) => {
  const count = await User.countDocuments({ email: new RegExp(`@${domain}$`) });
  return count;
};

const findListUserByDomain = async (domain, offset, limit) => {
  const users = await User.find({ email: new RegExp(`@${domain}$`) })
    .skip(offset)
    .limit(limit);
  return users;
};

const statisticsDomain = async () => {
  const stats = await User.aggregate([
    {
      $project: {
        domain: { $arrayElemAt: [{ $split: ['$email', '@'] }, 1] },
      },
    },
    {
      $group: {
        _id: '$domain',
        count: { $sum: 1 },
      },
    },
    { $sort: { count: -1 } },
  ]);
  return stats;
};

const deleteUserByDomainAndOffset = async (domain, offset, quantity) => {
  const users = await User.find({ email: new RegExp(`@${domain}$`) })
    .skip(offset)
    .limit(quantity);
  const emails = users.map((user) => user.email);
  await User.deleteMany({ email: { $in: emails } });
  return emails.length;
};

export default {
  createUser,
  findUser,
  updateUser,
  deleteUser,
  countDomainUsers,
  findListUserByDomain,
  statisticsDomain,
  deleteUserByDomainAndOffset,
};
