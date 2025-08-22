import mongoose from 'mongoose';
import md5 from 'md5';
import DomainStat from './domainStat.js';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  },
  time: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = md5(this.password);
  }

  next();
});

// Compare password
userSchema.methods.matchPassword = function (enteredPassword) {
  return md5(enteredPassword) === this.password;
};

userSchema.post('save', async function () {
  const domainId = this.email.split('@')[1];

  try {
    await DomainStat.findOneAndUpdate(
      { _id: domainId },
      { $inc: { count: 1 } },
      { upsert: true },
    );
  } catch (err) {
    console.error('Error updating DomainStat:', err);
  }
});

const User = mongoose.model('User', userSchema);

export default User;
