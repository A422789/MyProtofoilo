const Profile = require('../models/Profile');
const { sendSuccess, sendError } = require('../utils/responseFormatter');
const { replaceOnCloudinary, removeTempFile } = require('../utils/cloudinaryUpload');

// GET /api/profile — public
const getProfile = async (req, res, next) => {
  try {
    const profile = await Profile.findOne();
    if (!profile) {
      return sendError(res, 'Profile not found', 404);
    }
    sendSuccess(res, profile);
  } catch (error) {
    next(error);
  }
};

// PUT /api/admin/profile — update text fields
const updateProfile = async (req, res, next) => {
  try {
    const profile = await Profile.findOne();
    if (!profile) {
      return sendError(res, 'Profile not found. Run the seed script first.', 404);
    }

    const allowedFields = [
      'name', 'title', 'heroText', 'typeAnimationText',
      'aboutText', 'email', 'phone', 'location', 'footerText'
    ];

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        profile[field] = req.body[field];
      }
    });

    await profile.save();
    sendSuccess(res, profile, 'Profile updated successfully');
  } catch (error) {
    next(error);
  }
};

// PUT /api/admin/profile/hero-image
const updateHeroImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return sendError(res, 'No image file provided', 400);
    }

    const profile = await Profile.findOne();
    if (!profile) {
      removeTempFile(req.file.path);
      return sendError(res, 'Profile not found', 404);
    }

    const result = await replaceOnCloudinary(
      req.file.path,
      profile.heroImage?.publicId,
      'portfolio/profile',
      'image'
    );

    profile.heroImage = { url: result.url, publicId: result.publicId };
    await profile.save();
    removeTempFile(req.file.path);

    sendSuccess(res, profile, 'Hero image updated');
  } catch (error) {
    if (req.file) removeTempFile(req.file.path);
    next(error);
  }
};

// PUT /api/admin/profile/about-image
const updateAboutImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return sendError(res, 'No image file provided', 400);
    }

    const profile = await Profile.findOne();
    if (!profile) {
      removeTempFile(req.file.path);
      return sendError(res, 'Profile not found', 404);
    }

    const result = await replaceOnCloudinary(
      req.file.path,
      profile.aboutImage?.publicId,
      'portfolio/profile',
      'image'
    );

    profile.aboutImage = { url: result.url, publicId: result.publicId };
    await profile.save();
    removeTempFile(req.file.path);

    sendSuccess(res, profile, 'About image updated');
  } catch (error) {
    if (req.file) removeTempFile(req.file.path);
    next(error);
  }
};

// PUT /api/admin/profile/contact-image
const updateContactImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return sendError(res, 'No image file provided', 400);
    }

    const profile = await Profile.findOne();
    if (!profile) {
      removeTempFile(req.file.path);
      return sendError(res, 'Profile not found', 404);
    }

    const result = await replaceOnCloudinary(
      req.file.path,
      profile.contactImage?.publicId,
      'portfolio/profile',
      'image'
    );

    profile.contactImage = { url: result.url, publicId: result.publicId };
    await profile.save();
    removeTempFile(req.file.path);

    sendSuccess(res, profile, 'Contact image updated');
  } catch (error) {
    if (req.file) removeTempFile(req.file.path);
    next(error);
  }
};

// PUT /api/admin/profile/cv
const updateCV = async (req, res, next) => {
  try {
    if (!req.file) {
      return sendError(res, 'No CV file provided', 400);
    }

    const profile = await Profile.findOne();
    if (!profile) {
      removeTempFile(req.file.path);
      return sendError(res, 'Profile not found', 404);
    }

    const result = await replaceOnCloudinary(
      req.file.path,
      profile.cvFile?.publicId,
      'portfolio/cv',
      'raw'
    );

    profile.cvFile = { url: result.url, publicId: result.publicId };
    await profile.save();
    removeTempFile(req.file.path);

    sendSuccess(res, profile, 'CV updated');
  } catch (error) {
    if (req.file) removeTempFile(req.file.path);
    next(error);
  }
};

module.exports = {
  getProfile,
  updateProfile,
  updateHeroImage,
  updateAboutImage,
  updateContactImage,
  updateCV,
};
