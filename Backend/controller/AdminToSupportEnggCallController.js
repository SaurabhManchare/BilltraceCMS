const AdminToSupportEngg = require('../models/AdminToSupportEnggCallModel');

const createAdminToSupportEngg = async (req, res) => {
  try {
    const newAdminToSupportEnggid = await AdminToSupportEngg.countDocuments();
    const newCategoryData = {
      ...req.body,
      AdminToSupportEngg_id: newAdminToSupportEnggid + 1 
    };
    const category = await AdminToSupportEngg.create(newCategoryData);
    res.status(201).json({ success: true, data: category });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

const getAdminToSupportEngg = async (req, res) => {
  try {
    const categories = await AdminToSupportEngg.find().populate("UserId").populate("Call_Id").populate("OutletId");
    res.status(200).json({ success: true, data: categories });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getAdminToSupportEnggByID = async (req, res) => {
  try {
    const category = await AdminToSupportEngg.findById(req.params.id).populate("UserId").populate("Call_Id").populate("OutletId");
    if (!category) {
      return res.status(404).json({ success: false, message: 'AdminToSupportEngg not found' });
    }
    res.status(200).json({ success: true, data: category });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const updateAdminToSupportEngg = async (req, res) => {
  try {
    const updatedCategory = await AdminToSupportEngg.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCategory) {
      return res.status(404).json({ success: false, message: 'AdminToSupportEngg not found' });
    }
    res.status(200).json({ success: true, data: updatedCategory });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

const deleteAdminToSupportEngg = async (req, res) => {
  try {
    const deletedCategory = await AdminToSupportEngg.findByIdAndDelete(req.params.id);
    if (!deletedCategory) {
      return res.status(404).json({ success: false, message: 'AdminToSupportEngg not found' });
    }
    res.status(200).json({ success: true, message: 'AdminToSupportEngg deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
    createAdminToSupportEngg,
    getAdminToSupportEngg,
    getAdminToSupportEnggByID,
    updateAdminToSupportEngg,
    deleteAdminToSupportEngg
};
