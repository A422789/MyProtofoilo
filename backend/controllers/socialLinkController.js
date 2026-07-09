const SocialLink = require('../models/SocialLink');
const { sendSuccess, sendCreated, sendError } = require('../utils/responseFormatter');

// GET /api/social-links — public
const getSocialLinks = async (req, res, next) => {
  try {
    const links = await SocialLink.find().sort({ order: 1 });
    sendSuccess(res, links);
  } catch (error) {
    next(error);
  }
};

// POST /api/admin/social-links
const createSocialLink = async (req, res, next) => {
  try {
    const link = await SocialLink.create(req.body);
    sendCreated(res, link);
  } catch (error) {
    next(error);
  }
};

// PUT /api/admin/social-links/:id
const updateSocialLink = async (req, res, next) => {
  try {
    const link = await SocialLink.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!link) {
      return sendError(res, 'Social link not found', 404);
    }
    sendSuccess(res, link, 'Social link updated');
  } catch (error) {
    next(error);
  }
};

// DELETE /api/admin/social-links/:id
const deleteSocialLink = async (req, res, next) => {
  try {
    const link = await SocialLink.findByIdAndDelete(req.params.id);
    if (!link) {
      return sendError(res, 'Social link not found', 404);
    }
    sendSuccess(res, null, 'Social link deleted');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getSocialLinks,
  createSocialLink,
  updateSocialLink,
  deleteSocialLink,
};
