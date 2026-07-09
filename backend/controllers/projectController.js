const Project = require('../models/Project');
const { sendSuccess, sendCreated, sendError } = require('../utils/responseFormatter');
const { uploadToCloudinary, replaceOnCloudinary, deleteFromCloudinary, removeTempFile } = require('../utils/cloudinaryUpload');

// GET /api/projects — public
const getProjects = async (req, res, next) => {
  try {
    const projects = await Project.find().sort({ order: 1 });
    sendSuccess(res, projects);
  } catch (error) {
    next(error);
  }
};

// POST /api/admin/projects
const createProject = async (req, res, next) => {
  try {
    const projectData = { ...req.body };

    // Parse techStack if it's a comma-separated string
    if (typeof projectData.techStack === 'string') {
      projectData.techStack = projectData.techStack.split(',').map((s) => s.trim()).filter(Boolean);
    }

    // Handle image upload
    if (req.file) {
      const result = await uploadToCloudinary(req.file.path, 'portfolio/projects', 'image');
      projectData.image = { url: result.url, publicId: result.publicId };
      removeTempFile(req.file.path);
    }

    const project = await Project.create(projectData);
    sendCreated(res, project);
  } catch (error) {
    if (req.file) removeTempFile(req.file.path);
    next(error);
  }
};

// PUT /api/admin/projects/:id
const updateProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      if (req.file) removeTempFile(req.file.path);
      return sendError(res, 'Project not found', 404);
    }

    const updateData = { ...req.body };

    // Parse techStack if it's a comma-separated string
    if (typeof updateData.techStack === 'string') {
      updateData.techStack = updateData.techStack.split(',').map((s) => s.trim()).filter(Boolean);
    }

    // Handle image replacement
    if (req.file) {
      const result = await replaceOnCloudinary(
        req.file.path,
        project.image?.publicId,
        'portfolio/projects',
        'image'
      );
      updateData.image = { url: result.url, publicId: result.publicId };
      removeTempFile(req.file.path);
    }

    const updatedProject = await Project.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    sendSuccess(res, updatedProject, 'Project updated');
  } catch (error) {
    if (req.file) removeTempFile(req.file.path);
    next(error);
  }
};

// DELETE /api/admin/projects/:id
const deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return sendError(res, 'Project not found', 404);
    }

    // Delete Cloudinary asset
    if (project.image?.publicId) {
      await deleteFromCloudinary(project.image.publicId, 'image');
    }

    await Project.findByIdAndDelete(req.params.id);
    sendSuccess(res, null, 'Project deleted');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
};
