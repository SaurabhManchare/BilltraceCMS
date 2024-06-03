const CallsMasterModel = require("../models/CallMasterModel");

// Create a new call
const createCall = async (req, res) => {
  try {
    const newCall = await CallsMasterModel.create(req.body);
    res.status(201).json({ success: true, data: newCall });
  } catch (error) {
    console.error("Error creating call:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// Get all calls
const getAllCalls = async (req, res) => {
  try {
    const calls = await CallsMasterModel.find().populate("RestorantId").populate("OutletId");
    res.status(200).json({ success: true, data: calls });
  } catch (error) {
    console.error("Error getting calls:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// Get a single call by ID
const getCallById = async (req, res) => {
  try {
    const call = await CallsMasterModel.findById(req.params.id).populate("RestorantId").populate("OutletId");
    if (!call) {
      return res.status(404).json({ success: false, error: "Call not found" });
    }
    res.status(200).json({ success: true, data: call });
  } catch (error) {
    console.error("Error getting call by ID:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// Update a call by ID
const updateCall = async (req, res) => {
  try {
    const call = await CallsMasterModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!call) {
      return res.status(404).json({ success: false, error: "Call not found" });
    }
    res.status(200).json({ success: true, data: call });
  } catch (error) {
    console.error("Error updating call:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// Delete a call by ID
const deleteCall = async (req, res) => {
  try {
    const call = await CallsMasterModel.findByIdAndDelete(req.params.id);
    if (!call) {
      return res.status(404).json({ success: false, error: "Call not found" });
    }
    res.status(200).json({ success: true, message: "Call deleted successfully" });
  } catch (error) {
    console.error("Error deleting call:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

module.exports = {
  createCall,
  getAllCalls,
  getCallById,
  updateCall,
  deleteCall,
};
