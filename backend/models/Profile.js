const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
  },
  heroText: {
    type: String,
    required: [true, 'Hero text is required'],
  },
  typeAnimationText: {
    type: String,
    required: [true, 'Type animation text is required'],
  },
  aboutText: {
    type: String,
    required: [true, 'About text is required'],
  },
  heroImage: {
    url: { type: String, default: '' },
    publicId: { type: String, default: '' },
  },
  aboutImage: {
    url: { type: String, default: '' },
    publicId: { type: String, default: '' },
  },
  contactImage: {
    url: { type: String, default: '' },
    publicId: { type: String, default: '' },
  },
  cvFile: {
    url: { type: String, default: '' },
    publicId: { type: String, default: '' },
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
  },
  phone: {
    type: String,
    trim: true,
    default: '',
  },
  location: {
    type: String,
    trim: true,
    default: '',
  },
  footerText: {
    type: String,
    default: '',
  },
}, { timestamps: true });

module.exports = mongoose.model('Profile', profileSchema);
