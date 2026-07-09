const express = require('express');
const router = express.Router();
const { getProfile } = require('../controllers/profileController');
const { getSocialLinks } = require('../controllers/socialLinkController');
const { getProjects } = require('../controllers/projectController');
const { getSkills } = require('../controllers/skillController');
const { getCertificates } = require('../controllers/certificateController');
const { submitContact } = require('../controllers/contactController');
const { validate, schemas } = require('../middleware/validate');
const { contactLimiter } = require('../middleware/rateLimiter');

// Public read-only endpoints
router.get('/profile', getProfile);
router.get('/social-links', getSocialLinks);
router.get('/projects', getProjects);
router.get('/skills', getSkills);
router.get('/certificates', getCertificates);

// Contact form submission (rate-limited + validated)
router.post('/contact', contactLimiter, validate(schemas.contact), submitContact);

module.exports = router;
