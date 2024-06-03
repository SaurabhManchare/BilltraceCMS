const RoleMaster = require("../models/RoleMaster");

// Create a new role
const createRole = async (req, res) => {
  try {
    const newRole = await RoleMaster.create(req.body);
    res.status(201).json({ success: true, data: newRole });
  } catch (error) {
    console.error("Error creating role:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// Get all roles
const getAllRoles = async (req, res) => {
  try {
    const roles = await RoleMaster.find();
    res.status(200).json({ success: true, data: roles });
  } catch (error) {
    console.error("Error getting roles:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// Get a single role by ID
const getRoleById = async (req, res) => {
  try {
    const role = await RoleMaster.findById(req.params.id);
    if (!role) {
      return res.status(404).json({ success: false, error: "Role not found" });
    }
    res.status(200).json({ success: true, data: role });
  } catch (error) {
    console.error("Error getting role by ID:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// Update a role by ID
const updateRole = async (req, res) => {
  try {
    const role = await RoleMaster.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!role) {
      return res.status(404).json({ success: false, error: "Role not found" });
    }
    res.status(200).json({ success: true, data: role });
  } catch (error) {
    console.error("Error updating role:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// Delete a role by ID
const deleteRole = async (req, res) => {
  try {
    const role = await RoleMaster.findByIdAndDelete(req.params.id);
    if (!role) {
      return res.status(404).json({ success: false, error: "Role not found" });
    }
    res.status(200).json({ success: true, message: "Role deleted successfully" });
  } catch (error) {
    console.error("Error deleting role:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

module.exports = {
  createRole,
  getAllRoles,
  getRoleById,
  updateRole,
  deleteRole,
};
