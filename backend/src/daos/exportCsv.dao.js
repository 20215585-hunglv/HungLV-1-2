import ExportCsv from '../models/exportCsv.model.js';

const createExportLog = async (data) => {
  return await ExportCsv.create(data);
};

const updateExportLog = async (id, data) => {
  return ExportCsv.findByIdAndUpdate(id, data, { new: true });
};

export default {
  createExportLog,
  updateExportLog,
};
