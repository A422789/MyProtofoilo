const cloudinary = require('../config/cloudinary');
const logger = require('./logger');
const fs = require('fs');

/**
 * Upload a file to Cloudinary.
 * @param {string} filePath - Local file path or buffer path (from multer)
 * @param {string} folder - Cloudinary folder name (e.g. 'portfolio/projects')
 * @param {string} resourceType - 'image', 'raw' (for PDFs), or 'auto'
 * @returns {Object} { url, publicId }
 */
const uploadToCloudinary = async (filePath, folder = 'portfolio', resourceType = 'auto') => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder,
      resource_type: resourceType,
      use_filename: true,
      unique_filename: true,
    });

    logger.info(`Cloudinary upload success: ${result.public_id}`);

    return {
      url: result.secure_url,
      publicId: result.public_id,
    };
  } catch (error) {
    logger.error(`Cloudinary upload error: ${error.message}`);
    throw new Error(`Cloudinary upload failed: ${error.message}`);
  }
};

/**
 * Delete an asset from Cloudinary by public_id.
 * @param {string} publicId - The Cloudinary public_id to delete
 * @param {string} resourceType - 'image', 'raw', or 'video'
 */
const deleteFromCloudinary = async (publicId, resourceType = 'image') => {
  try {
    if (!publicId) return;
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType,
    });
    logger.info(`Cloudinary delete: ${publicId} — ${result.result}`);
    return result;
  } catch (error) {
    logger.error(`Cloudinary delete error: ${error.message}`);
    throw new Error(`Cloudinary delete failed: ${error.message}`);
  }
};

/**
 * Replace an existing Cloudinary asset with a new upload.
 * Deletes the old asset first, then uploads the new one.
 * @param {string} filePath - New file path
 * @param {string} oldPublicId - The existing asset's public_id to delete
 * @param {string} folder - Cloudinary folder name
 * @param {string} resourceType - 'image', 'raw', or 'auto'
 * @returns {Object} { url, publicId }
 */
const replaceOnCloudinary = async (filePath, oldPublicId, folder = 'portfolio', resourceType = 'auto') => {
  // Delete old asset if it exists
  if (oldPublicId) {
    const deleteResourceType = resourceType === 'auto' ? 'image' : resourceType;
    await deleteFromCloudinary(oldPublicId, deleteResourceType);
  }

  // Upload new asset
  return await uploadToCloudinary(filePath, folder, resourceType);
};

/**
 * Remove the temp file created by multer after upload.
 * @param {string} filePath - Path to the temp file
 */
const removeTempFile = (filePath) => {
  try {
    if (filePath && fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  } catch (error) {
    logger.error(`Failed to remove temp file: ${error.message}`);
  }
};

module.exports = {
  uploadToCloudinary,
  deleteFromCloudinary,
  replaceOnCloudinary,
  removeTempFile,
};
