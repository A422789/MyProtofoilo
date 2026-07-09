const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const protect = require('../middleware/auth');
const { validate, schemas } = require('../middleware/validate');

// Controllers
const { updateProfile, updateHeroImage, updateAboutImage, updateContactImage, updateCV } = require('../controllers/profileController');
const { getSocialLinks, createSocialLink, updateSocialLink, deleteSocialLink } = require('../controllers/socialLinkController');
const { getProjects, createProject, updateProject, deleteProject } = require('../controllers/projectController');
const { getSkills, createSkill, updateSkill, deleteSkill } = require('../controllers/skillController');
const { getCertificates, createCertificate, updateCertificate, deleteCertificate } = require('../controllers/certificateController');
const { getContacts, markAsRead, deleteContact } = require('../controllers/contactController');

// Multer config for file uploads (temp storage)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', 'uploads'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowedImageTypes = /jpeg|jpg|png|gif|webp|svg\+xml/;
  const allowedDocTypes = /pdf/;
  const mimeType = file.mimetype.toLowerCase();

  if (allowedImageTypes.test(mimeType) || allowedDocTypes.test(mimeType)) {
    cb(null, true);
  } else {
    cb(new Error('Only image files (jpg, png, gif, webp, svg) and PDF files are allowed'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max
});

// All admin routes require JWT
router.use(protect);

// ── Profile ──
router.put('/profile', validate(schemas.profileUpdate), updateProfile);
router.put('/profile/hero-image', upload.single('image'), updateHeroImage);
router.put('/profile/about-image', upload.single('image'), updateAboutImage);
router.put('/profile/contact-image', upload.single('image'), updateContactImage);
router.put('/profile/cv', upload.single('file'), updateCV);

// ── Social Links ──
router.get('/social-links', getSocialLinks);
router.post('/social-links', validate(schemas.socialLink), createSocialLink);
router.put('/social-links/:id', validate(schemas.objectId, 'params'), validate(schemas.socialLink), updateSocialLink);
router.delete('/social-links/:id', validate(schemas.objectId, 'params'), deleteSocialLink);

// ── Projects ──
router.get('/projects', getProjects);
router.post('/projects', upload.single('image'), createProject);
router.put('/projects/:id', validate(schemas.objectId, 'params'), upload.single('image'), updateProject);
router.delete('/projects/:id', validate(schemas.objectId, 'params'), deleteProject);

// ── Skills ──
router.get('/skills', getSkills);
router.post('/skills', validate(schemas.skill), createSkill);
router.put('/skills/:id', validate(schemas.objectId, 'params'), validate(schemas.skill), updateSkill);
router.delete('/skills/:id', validate(schemas.objectId, 'params'), deleteSkill);

// ── Certificates ──
router.get('/certificates', getCertificates);
router.post('/certificates', upload.single('file'), createCertificate);
router.put('/certificates/:id', validate(schemas.objectId, 'params'), upload.single('file'), updateCertificate);
router.delete('/certificates/:id', validate(schemas.objectId, 'params'), deleteCertificate);

// ── Contact Submissions ──
router.get('/contacts', getContacts);
router.put('/contacts/:id/read', validate(schemas.objectId, 'params'), markAsRead);
router.delete('/contacts/:id', validate(schemas.objectId, 'params'), deleteContact);

module.exports = router;
