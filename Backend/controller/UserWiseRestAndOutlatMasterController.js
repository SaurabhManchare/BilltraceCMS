const UserRestOutlatIDMaster = require('../models/UserWiseRestAndOutlatMasterModel');


const createUserWiseRestAndOutlet = async (req, res) => {
  try {
    const UserRestOutlatIDMasterID = await UserRestOutlatIDMaster.countDocuments();
    const newCategoryData = {
      ...req.body,
      UserRestOutlatIDMaster_id: UserRestOutlatIDMasterID + 1 
    };
    const category = await UserRestOutlatIDMaster.create(newCategoryData);
    res.status(201).json({ success: true, data: category });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

const getUserWiseRestAndOutlet = async (req, res) => {
  try {
    const categories = await UserRestOutlatIDMaster.find().populate("UserId").populate("RestorantId").populate("OutletId");
    res.status(200).json({ success: true, data: categories });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getUserWiseRestAndOutletById = async (req, res) => {
  try {
    const category = await UserRestOutlatIDMaster.findById(req.params.id).populate("UserId").populate("RestorantId").populate("OutletId");
    if (!category) {
      return res.status(404).json({ success: false, message: 'UserWiseRestAndOutlet not found' });
    }
    res.status(200).json({ success: true, data: category });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const updateUserWiseRestAndOutlet = async (req, res) => {
  try {
    const updatedCategory = await UserRestOutlatIDMaster.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCategory) {
      return res.status(404).json({ success: false, message: 'UserWiseRestAndOutlet not found' });
    }
    res.status(200).json({ success: true, data: updatedCategory });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

const deleteUserWiseRestAndOutlet = async (req, res) => {
  try {
    const deletedCategory = await UserRestOutlatIDMaster.findByIdAndDelete(req.params.id);
    if (!deletedCategory) {
      return res.status(404).json({ success: false, message: 'UserWiseRestAndOutlet not found' });
    }
    res.status(200).json({ success: true, message: 'UserWiseRestAndOutlet deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};



module.exports = {
  createUserWiseRestAndOutlet,
  getUserWiseRestAndOutlet,
  getUserWiseRestAndOutletById,
  updateUserWiseRestAndOutlet,
  deleteUserWiseRestAndOutlet,
};
