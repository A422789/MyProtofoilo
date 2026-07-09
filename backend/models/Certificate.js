const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Certificate title is required'],
    trim: true,
  },
  issuer: {
    type: String,
    default: 'IBM',
    trim: true,
  },
  completionDate: {
    type: String,
    default: '',
    trim: true,
  },
  verifyLink: {
    type: String,
    default: '',
    trim: true,
  },
  certificateFile: {
    url: { type: String, default: '' },
    publicId: { type: String, default: '' },
  },
  order: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });

module.exports = mongoose.model('Certificate', certificateSchema);
