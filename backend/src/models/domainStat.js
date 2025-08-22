import mongoose from 'mongoose';

const domainStatSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
    required: true,
    default: 0,
  },
});

domainStatSchema.pre('findOneAndUpdate', function (next) {
  this.set({ updatedAt: new Date() });
  next();
});

const DomainStat = mongoose.model('DomainStat', domainStatSchema);

export default DomainStat;
