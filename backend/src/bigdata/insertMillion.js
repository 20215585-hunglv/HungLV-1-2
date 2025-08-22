import md5 from 'md5';
import { v4 as uuidv4 } from 'uuid';
import connectDB from '../configs/db.js';
import emailDomains from '../constants/emailDomains.js';
import User from '../models/user.model.js';
import 'dotenv/config';

const TOTAL_USERS = 2000000;
const BATCH_SIZE = 10000;

const generateRandomPassword = (length = 6) => {
  const chars =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
  let pass = '';
  for (let i = 0; i < length; i += 1) {
    pass += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return pass;
};

const randomDate = (start, end) => {
  const startTime = start.getTime();
  const endTime = end.getTime();
  return new Date(startTime + Math.random() * (endTime - startTime));
};

const generateUserData = async (count) => {
  const users = new Set();
  const result = [];
  const simplePassword = [];

  const startDate = new Date('2025-08-11T00:00:00Z');
  const endDate = new Date('2025-08-31T23:59:59Z');

  while (result.length < count) {
    const name = uuidv4();
    const domain =
      emailDomains[Math.floor(Math.random() * emailDomains.length)];
    const email = `${name}@${domain}`;
    const password = generateRandomPassword();

    if (!users.has(email)) {
      users.add(email);
      result.push({ email, time: randomDate(startDate, endDate) });
      simplePassword.push(password);
    }
  }

  const hashedPasswords = simplePassword.map((pw) => md5(pw));

  return result.map(({ email, time }, index) => ({
    email,
    password: hashedPasswords[index],
    time,
  }));
};

const insertMillion = async () => {
  await connectDB();

  console.time('Total time');

  for (let i = 0; i < TOTAL_USERS; i += BATCH_SIZE) {
    const batch = await generateUserData(BATCH_SIZE);
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
