const Certificate = require('../models/Certificate');
const { sendSuccess, sendCreated, sendError } = require('../utils/responseFormatter');
const { uploadToCloudinary, replaceOnCloudinary, deleteFromCloudinary, removeTempFile } = require('../utils/cloudinaryUpload');

// GET /api/certificates — public
const getCertificates = async (req, res, next) => {
  try {
    const certificates = await Certificate.find().sort({ order: 1 });
    sendSuccess(res, certificates);
  } catch (error) {
    next(error);
  }
};

// POST /api/admin/certificates
const createCertificate = async (req, res, next) => {
  try {
    const certData = { ...req.body };

    if (req.file) {
      const result = await uploadToCloudinary(req.file.path, 'portfolio/certificates', 'raw');
      certData.certificateFile = { url: result.url, publicId: result.publicId };
      removeTempFile(req.file.path);
    }

    const certificate = await Certificate.create(certData);
    sendCreated(res, certificate);
  } catch (error) {
    if (req.file) removeTempFile(req.file.path);
    next(error);
  }
};

// PUT /api/admin/certificates/:id
const updateCertificate = async (req, res, next) => {
  try {
    const certificate = await Certificate.findById(req.params.id);
    if (!certificate) {
      if (req.file) removeTempFile(req.file.path);
      return sendError(res, 'Certificate not found', 404);
    }

    const updateData = { ...req.body };

    if (req.file) {
      const result = await replaceOnCloudinary(
        req.file.path,
        certificate.certificateFile?.publicId,
        'portfolio/certificates',
        'raw'
      );
      updateData.certificateFile = { url: result.url, publicId: result.publicId };
      removeTempFile(req.file.path);
    }

    const updatedCert = await Certificate.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    sendSuccess(res, updatedCert, 'Certificate updated');
  } catch (error) {
    if (req.file) removeTempFile(req.file.path);
    next(error);
  }
};

// DELETE /api/admin/certificates/:id
const deleteCertificate = async (req, res, next) => {
  try {
    const certificate = await Certificate.findById(req.params.id);
    if (!certificate) {
      return sendError(res, 'Certificate not found', 404);
    }

    if (certificate.certificateFile?.publicId) {
      await deleteFromCloudinary(certificate.certificateFile.publicId, 'raw');
    }

    await Certificate.findByIdAndDelete(req.params.id);
    sendSuccess(res, null, 'Certificate deleted');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCertificates,
  createCertificate,
  updateCertificate,
  deleteCertificate,
};
