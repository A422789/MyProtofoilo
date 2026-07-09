const jwt = require('jsonwebtoken');
const { sendError } = require('../utils/responseFormatter');
const logger = require('../utils/logger');

const protect = (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    logger.warn(`Unauthorized access attempt: ${req.originalUrl}`);
    return sendError(res, 'Not authorized — no token provided', 401);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.adminId = decoded.id;
    next();
  } catch (error) {
    logger.warn(`Invalid token used: ${req.originalUrl}`);
    return sendError(res, 'Not authorized — invalid token', 401);
  }
};

module.exports = protect;
