const ContactSubmission = require('../models/ContactSubmission');
const { sendSuccess, sendCreated, sendError } = require('../utils/responseFormatter');
const logger = require('../utils/logger');

// POST /api/contact — public
const submitContact = async (req, res, next) => {
  try {
    const { name, email, message } = req.body;

    // Save to database
    const submission = await ContactSubmission.create({ name, email, message });
    logger.info(`Contact submission saved to DB from: ${email}`);

    sendCreated(res, { id: submission._id }, 'Message sent successfully');
  } catch (error) {
    next(error);
  }
};

// GET /api/admin/contacts — admin only
const getContacts = async (req, res, next) => {
  try {
    const contacts = await ContactSubmission.find().sort({ createdAt: -1 });
    sendSuccess(res, contacts);
  } catch (error) {
    next(error);
  }
};

// PUT /api/admin/contacts/:id/read — mark as read
const markAsRead = async (req, res, next) => {
  try {
    const contact = await ContactSubmission.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );
    if (!contact) {
      return sendError(res, 'Contact submission not found', 404);
    }
    sendSuccess(res, contact, 'Marked as read');
  } catch (error) {
    next(error);
  }
};

// DELETE /api/admin/contacts/:id
const deleteContact = async (req, res, next) => {
  try {
    const contact = await ContactSubmission.findByIdAndDelete(req.params.id);
    if (!contact) {
      return sendError(res, 'Contact submission not found', 404);
    }
    sendSuccess(res, null, 'Contact submission deleted');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  submitContact,
  getContacts,
  markAsRead,
  deleteContact,
};
