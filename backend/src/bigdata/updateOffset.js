import User from '../models/user.model.js';
import connectDB from '../configs/db.js';

const BATCH_SIZE = 10000;

async function addOffsets() {
  await connectDB();

  let offsetCounter = 0;
  let lastId = null;
  let batchCount = 0;

  while (true) {
    const query = lastId ? { _id: { $gt: lastId } } : {};
    const users = await User.find(query)
      .sort({ _id: 1 })
      .limit(BATCH_SIZE)
      .select('_id');

    if (users.length === 0) break;

    const bulkOps = users.map((user) => ({
      updateOne: {
        filter: { _id: user._id },
        update: { $set: { offset: (offsetCounter += 1) } },
      },
    }));

    await User.bulkWrite(bulkOps);

    lastId = users[users.length - 1]._id;
    batchCount += 1;

    console.log(`Batch ${batchCount} done. Last offset: ${offsetCounter}`);
  }

  console.log(' Done adding offset to all users!');
  process.exit(0);
}

addOffsets().catch((err) => {
  console.error(err);
  process.exit(1);
});
