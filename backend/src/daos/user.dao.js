import mongoose from 'mongoose';
import User from '../models/user.model.js';
import DomainStat from '../models/domainStat.js';

const { ObjectId } = mongoose.Types;

const createUser = async ({ email, password }) => {
  const user = await User.create({ email, password });
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

const findAllUser = async () => {
  const users = await User.find({});
  return users;
};

const updateUser = async (id, updateData) => {
  const user = await User.findByIdAndUpdate(id, updateData, { new: true });
  return user;
};

const deleteUser = async (id) => {
  const user = await User.findByIdAndDelete(id);
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
    { $out: 'domainstats' },
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

const findUserByOffset = async (offset, limit) => {
  const users = await User.find({ offset: { $gte: offset } })
    .sort({ offset: 1 })
    .limit(limit);
  return users;
};

const deleteUserByOffset = async (offset, limit) => {
  const users = await User.find().skip(offset).limit(limit);
  await User.deleteMany({ _id: { $in: users.map((user) => user._id) } });
  return users.length;
};

const statisticsByDate = async (fromDate, toDate) => {
  const stats = await User.aggregate([
    {
      $match: {
        time: {
          $gte: new Date(fromDate),
          $lte: new Date(toDate),
        },
      },
    },
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

const findUserByTime = async (fromDate, toDate) => {
  const from = new Date(fromDate);
  const to = new Date(toDate);
  return User.find({ time: { $gte: from, $lte: to } }).lean();
};

const getDomainStatsFromCollection = async () => {
  const stats = await DomainStat.find({}).sort({ count: -1 });
  return stats;
};

export default {
  createUser,
  findUser,
  findAllUser,
  updateUser,
  deleteUser,
  countDomainUsers,
  findListUserByDomain,
  statisticsDomain,
  deleteUserByDomainAndOffset,
  findUserByOffset,
  deleteUserByOffset,
  statisticsByDate,
  findUserByTime,
  getDomainStatsFromCollection,
};
