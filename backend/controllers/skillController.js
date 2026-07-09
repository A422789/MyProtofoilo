const Skill = require('../models/Skill');
const { sendSuccess, sendCreated, sendError } = require('../utils/responseFormatter');

// GET /api/skills — public
const getSkills = async (req, res, next) => {
  try {
    const skills = await Skill.find().sort({ order: 1 });
    sendSuccess(res, skills);
  } catch (error) {
    next(error);
  }
};

// POST /api/admin/skills
const createSkill = async (req, res, next) => {
  try {
    const skill = await Skill.create(req.body);
    sendCreated(res, skill);
  } catch (error) {
    next(error);
  }
};

// PUT /api/admin/skills/:id
const updateSkill = async (req, res, next) => {
  try {
    const skill = await Skill.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!skill) {
      return sendError(res, 'Skill not found', 404);
    }
    sendSuccess(res, skill, 'Skill updated');
  } catch (error) {
    next(error);
  }
};

// DELETE /api/admin/skills/:id
const deleteSkill = async (req, res, next) => {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id);
    if (!skill) {
      return sendError(res, 'Skill not found', 404);
    }
    sendSuccess(res, null, 'Skill deleted');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getSkills,
  createSkill,
  updateSkill,
  deleteSkill,
};
