const ContactSubmission = require('../models/ContactSubmission');
const nodemailer = require('nodemailer');
const { sendSuccess, sendCreated, sendError } = require('../utils/responseFormatter');
const logger = require('../utils/logger');

// Create email transporter (reusable)
let transporter = null;

const getTransporter = () => {
  if (transporter) return transporter;

  if (process.env.EMAIL_USER && process.env.EMAIL_PASS && process.env.EMAIL_PASS !== 'YOUR_GMAIL_APP_PASSWORD_HERE') {
    transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE || 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    return transporter;
  }

  return null;
};

// POST /api/contact — public
const submitContact = async (req, res, next) => {
  try {
    const { name, email, message } = req.body;

    // Save to database
    const submission = await ContactSubmission.create({ name, email, message });

    // Send email notification (non-blocking — don't fail the request if email fails)
    try {
      const mailer = getTransporter();
      if (mailer) {
        await mailer.sendMail({
          from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
          to: process.env.EMAIL_TO || process.env.EMAIL_USER,
          replyTo: email,
          subject: `New Portfolio Contact: ${name}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #cea605;">New Contact Form Submission</h2>
              <hr style="border-color: #cea605;" />
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
              <p><strong>Message:</strong></p>
              <blockquote style="background: #f9f9f9; padding: 15px; border-left: 4px solid #cea605;">
                ${message}
              </blockquote>
              <hr />
              <p style="color: #888; font-size: 12px;">
                Sent from your portfolio contact form at ${new Date().toLocaleString()}
              </p>
            </div>
          `,
        });
        logger.info(`Contact email notification sent for submission from: ${email}`);
      } else {
        logger.info('Email not configured — submission saved to DB only');
      }
    } catch (emailError) {
      // Don't fail the request if email fails — submission is already saved
      logger.error(`Email notification failed: ${emailError.message}`);
    }

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
