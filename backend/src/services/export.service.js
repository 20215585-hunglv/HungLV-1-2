import { Parser } from 'json2csv';
import path from 'path';
import fs from 'fs';
import exportCsvDao from '../daos/exportCsv.dao.js';
import userDao from '../daos/user.dao.js';

const exportUsersService = async (userId, from, to) => {
  // Tạo export
  const log = await exportCsvDao.createExportLog({
    requestedBy: userId,
    from,
    to,
    status: 'pending',
    createdAt: new Date(),
  });

  try {
    // Lấy data user
    const users = await userDao.findUserByTime(from, to);
    if (!users.length) {
      throw new Error('No users found in this range');
    }

    // Convert sang CSV
    const fields = ['_id', 'email', 'role', 'time'];
    const parser = new Parser({ fields });
    const csv = parser.parse(users);

    // Lưu file CSV vào server
    const fileName = `users_export_${Date.now()}.csv`;
    const filePath = path.join('src/exports', fileName);
    const absolutePath = path.resolve(filePath);

    // đảm bảo thư mục tồn tại
    fs.mkdirSync('src/exports', { recursive: true });
    fs.writeFileSync(filePath, csv);

    // Update export
    await exportCsvDao.updateExportLog(log._id, {
      status: 'completed',
      fileName: absolutePath,
      finishedAt: new Date(),
    });

    return csv;
  } catch (err) {
    // update status fail
    await exportCsvDao.updateExportLog(log._id, { status: 'failed' });
    throw err;
  }
};

export default {
  exportUsersService,
};
