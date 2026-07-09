const express = require('express');
const router = express.Router();
const { login } = require('../controllers/authController');
const { validate, schemas } = require('../middleware/validate');
const { loginLimiter } = require('../middleware/rateLimiter');

// POST /api/auth/login — rate limited to 5 attempts per 15 minutes
router.post('/login', loginLimiter, validate(schemas.login), login);

module.exports = router;
