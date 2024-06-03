const HelpCenterData = require("../models/HelpCenterModel");

// Create a new HelpCenterData
const createHelpCenterData = async (req, res) => {
  try {
    const newHelpCenterData = await HelpCenterData.create(req.body);
    res.status(201).json({ success: true, data: newHelpCenterData });
  } catch (error) {
    console.error("Error creating HelpCenterData:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// Get all HelpCenterDatas
const getAllHelpCenterDatas = async (req, res) => {
  try {
    const helpCenterDatas = await HelpCenterData.find();
    res.status(200).json({ success: true, data: helpCenterDatas });
  } catch (error) {
    console.error("Error getting HelpCenterDatas:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// Get a single HelpCenterData by ID
const getHelpCenterDataById = async (req, res) => {
  try {
    const helpCenterData = await HelpCenterData.findById(req.params.id);
    if (!helpCenterData) {
      return res.status(404).json({ success: false, error: "HelpCenterData not found" });
    }
    res.status(200).json({ success: true, data: helpCenterData });
  } catch (error) {
    console.error("Error getting HelpCenterData by ID:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// Update a HelpCenterData by ID
const updateHelpCenterData = async (req, res) => {
  try {
    const helpCenterData = await HelpCenterData.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!helpCenterData) {
      return res.status(404).json({ success: false, error: "HelpCenterData not found" });
    }
    res.status(200).json({ success: true, data: helpCenterData });
  } catch (error) {
    console.error("Error updating HelpCenterData:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// Delete a HelpCenterData by ID
const deleteHelpCenterData = async (req, res) => {
  try {
    const helpCenterData = await HelpCenterData.findByIdAndDelete(req.params.id);
    if (!helpCenterData) {
      return res.status(404).json({ success: false, error: "HelpCenterData not found" });
    }
    res.status(200).json({ success: true, message: "HelpCenterData deleted successfully" });
  } catch (error) {
    console.error("Error deleting HelpCenterData:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

module.exports = {
  createHelpCenterData,
  getAllHelpCenterDatas,
  getHelpCenterDataById,
  updateHelpCenterData,
  deleteHelpCenterData,
};
