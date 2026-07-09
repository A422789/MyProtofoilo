const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const logger = require('../utils/logger');
const { sendSuccess, sendError } = require('../utils/responseFormatter');

// POST /api/auth/login
const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // Find admin by username
    const admin = await Admin.findOne({ username });
    if (!admin) {
      logger.warn(`Login failed — user not found: ${username}`);
      return sendError(res, 'Invalid credentials', 401);
    }

    // Check password
    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      logger.warn(`Login failed — wrong password for: ${username}`);
      return sendError(res, 'Invalid credentials', 401);
    }

    // Generate JWT
    const token = jwt.sign(
      { id: admin._id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
    );

    logger.info(`Login success: ${username}`);

    sendSuccess(res, { token, expiresIn: process.env.JWT_EXPIRES_IN || '1d' }, 'Login successful');
  } catch (error) {
    next(error);
  }
};

module.exports = { login };
