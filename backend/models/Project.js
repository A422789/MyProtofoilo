const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
  },
  techStack: [{
    type: String,
    trim: true,
  }],
  image: {
    url: { type: String, default: '' },
    publicId: { type: String, default: '' },
  },
  repoLink: {
    type: String,
    trim: true,
    default: '',
  },
  liveLink: {
    type: String,
    trim: true,
    default: '',
  },
  order: {
    type: Number,
    default: 0,
  },
  featured: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
