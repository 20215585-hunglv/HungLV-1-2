import mongoose from 'mongoose';

const exportLogSchema = new mongoose.Schema({
  requestedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  from: { type: Date },
  to: { type: Date },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending',
  },
  fileName: { type: String },
  createdAt: { type: Date },
  finishedAt: { type: Date },
});

const ExportCsv = mongoose.model('ExportCsv', exportLogSchema);

export default ExportCsv;
