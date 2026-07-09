const Joi = require('joi');
const sanitizeHtml = require('sanitize-html');
const { sendError } = require('../utils/responseFormatter');

/**
 * Creates a Joi validation middleware.
 * @param {Joi.ObjectSchema} schema - The Joi schema to validate against
 * @param {'body'|'query'|'params'} property - Which part of the request to validate
 */
const validate = (schema, property = 'body') => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req[property], {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const errors = error.details.map((detail) => detail.message);
      return sendError(res, 'Validation failed', 400, errors);
    }

    // Sanitize all string values in the validated body to prevent XSS
    if (property === 'body') {
      req[property] = sanitizeStrings(value);
    } else {
      req[property] = value;
    }

    next();
  };
};

/**
 * Recursively sanitize all string values in an object.
 */
function sanitizeStrings(obj) {
  if (typeof obj === 'string') {
    return sanitizeHtml(obj, {
      allowedTags: [],
      allowedAttributes: {},
    });
  }
  if (Array.isArray(obj)) {
    return obj.map(sanitizeStrings);
  }
  if (obj && typeof obj === 'object') {
    const sanitized = {};
    for (const [key, val] of Object.entries(obj)) {
      // Skip sanitizing SVG fields — they contain legitimate HTML/SVG markup
      if (key === 'iconSvg') {
        sanitized[key] = val;
      } else {
        sanitized[key] = sanitizeStrings(val);
      }
    }
    return sanitized;
  }
  return obj;
}

// ────────────────────────────────────────────────────
// Joi Schemas for each endpoint
// ────────────────────────────────────────────────────

const schemas = {
  // Auth
  login: Joi.object({
    username: Joi.string().required().messages({ 'any.required': 'Username is required' }),
    password: Joi.string().required().messages({ 'any.required': 'Password is required' }),
  }),

  // Contact form
  contact: Joi.object({
    name: Joi.string().trim().min(2).max(100).required()
      .messages({ 'string.min': 'Name must be at least 2 characters' }),
    email: Joi.string().trim().email().required()
      .messages({ 'string.email': 'Please provide a valid email' }),
    message: Joi.string().trim().min(10).max(2000).required()
      .messages({ 'string.min': 'Message must be at least 10 characters' }),
  }),

  // Profile update
  profileUpdate: Joi.object({
    name: Joi.string().trim().min(2).max(100),
    title: Joi.string().trim().max(200),
    heroText: Joi.string().trim().max(1000),
    typeAnimationText: Joi.string().trim().max(500),
    aboutText: Joi.string().trim().max(3000),
    email: Joi.string().trim().email(),
    phone: Joi.string().trim().allow('').max(50),
    location: Joi.string().trim().allow('').max(200),
    footerText: Joi.string().trim().allow('').max(500),
  }),

  // Social link
  socialLink: Joi.object({
    platform: Joi.string().trim().required().max(100),
    url: Joi.string().trim().uri().required(),
    iconSvg: Joi.string().allow('').max(10000),
    order: Joi.number().integer().min(0),
  }),

  // Project
  project: Joi.object({
    title: Joi.string().trim().required().max(200),
    description: Joi.string().trim().required().max(3000),
    techStack: Joi.alternatives().try(
      Joi.array().items(Joi.string().trim()),
      Joi.string().trim()
    ),
    repoLink: Joi.string().trim().allow('').uri(),
    liveLink: Joi.string().trim().allow('').uri(),
    order: Joi.number().integer().min(0),
    featured: Joi.boolean(),
  }),

  // Skill
  skill: Joi.object({
    name: Joi.string().trim().required().max(100),
    category: Joi.string().trim().allow('').max(100),
    iconSvg: Joi.string().allow('').max(10000),
    order: Joi.number().integer().min(0),
    isHidden: Joi.boolean(),
  }),

  // Certificate
  certificate: Joi.object({
    title: Joi.string().trim().required().max(300),
    issuer: Joi.string().trim().allow('').max(200),
    completionDate: Joi.string().trim().allow('').max(100),
    verifyLink: Joi.string().trim().allow('').uri(),
    order: Joi.number().integer().min(0),
  }),

  // ObjectId param
  objectId: Joi.object({
    id: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
      .messages({ 'string.pattern.base': 'Invalid ID format' }),
  }),
};

module.exports = { validate, schemas };
