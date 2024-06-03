const SupportEnggData = require('../models/SupportEnggCallMessageModel');

const createSupportEnggData = async (req, res) => {
  try {
    const newSupportEnggData = await SupportEnggData.create(req.body);
    res.status(201).json({ success: true, data: newSupportEnggData });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

const getSupportEnggData = async (req, res) => {
  try {
    const categories = await SupportEnggData.find().populate("UserId").populate("OutletId").populate("Call_Id").populate("AdminToSupportEngg_id");
    res.status(200).json({ success: true, data: categories });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getSupportEnggDataByID = async (req, res) => {
  try {
    const category = await SupportEnggData.findById(req.params.id).populate("UserId").populate("OutletId").populate("Call_Id").populate("AdminToSupportEngg_id");
    if (!category) {
      return res.status(404).json({ success: false, message: 'SupportEnggData not found' });
    }
    res.status(200).json({ success: true, data: category });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const updateSupportEnggData = async (req, res) => {
  try {
    const updatedCategory = await SupportEnggData.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCategory) {
      return res.status(404).json({ success: false, message: 'SupportEnggData not found' });
    }
    res.status(200).json({ success: true, data: updatedCategory });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

const deleteSupportEnggData = async (req, res) => {
  try {
    const deletedCategory = await SupportEnggData.findByIdAndDelete(req.params.id);
    if (!deletedCategory) {
      return res.status(404).json({ success: false, message: 'SupportEnggData not found' });
    }
    res.status(200).json({ success: true, message: 'SupportEnggData deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  createSupportEnggData,
  getSupportEnggData,
  getSupportEnggDataByID,
  updateSupportEnggData,
  deleteSupportEnggData
};
