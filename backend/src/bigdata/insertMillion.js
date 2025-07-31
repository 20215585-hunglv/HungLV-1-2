import connectDB from '../configs/db.js';
import emailDomains from '../constants/emailDomains.js';
import User from '../models/user.model.js';
import 'dotenv/config';

const TOTAL_USERS = 1000000;
const BATCH_SIZE = 1000;

const generateRandomPassword = (length = 6) => {
  const chars =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
  let pass = '';
  for (let i = 0; i < length; i++) {
    pass += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return pass;
};

const generateUserData = (count) => {
  const users = new Set();
  const result = [];
  while (result.length < count) {
    const name = Math.random().toString(36).substring(2, 8);
    const domain =
      emailDomains[Math.floor(Math.random() * emailDomains.length)];
    const email = `${name}@${domain}`;
    const password = generateRandomPassword(6);

    if (!users.has(email)) {
      users.add(email);
      result.push({ email, password });
    }
  }

  return result;
};

const insertMillion = async () => {
  await connectDB();

  console.time('Total time');

  for (let i = 0; i < TOTAL_USERS; i += BATCH_SIZE) {
    const batch = generateUserData(BATCH_SIZE);
    try {
      await User.insertMany(batch, { ordered: false });
      console.log(
        `Inserted batch ${i / BATCH_SIZE + 1} (${i + BATCH_SIZE}/${TOTAL_USERS})`,
      );
    } catch (err) {
      console.error('Insert error in batch:', err.message);
    }
  }

  console.timeEnd('Total time');
  console.log('completed!');
  process.exit(0);
};

insertMillion();
