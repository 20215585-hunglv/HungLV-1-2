import mongoose from 'mongoose';
import connectDB from '../configs/db.js';
import User from '../models/user.model.js';

const updateDomains = async () => {
  try {
    await connectDB();

    const res = await User.updateMany(
      { email: { $exists: true }, domain: { $exists: false } },
      [
        {
          $set: {
            domain: { $arrayElemAt: [{ $split: ['$email', '@'] }, 1] },
          },
        },
      ],
    );

    console.log(`Updated ${res.modifiedCount} documents with domain field.`);

    await mongoose.disconnect();
    console.log('MongoDB disconnected.');
  } catch (err) {
    console.error('Error updating domains:', err);
  }
};

updateDomains();
