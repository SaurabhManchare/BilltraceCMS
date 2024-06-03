const OutlateMaster = require('../models/OutlateMasterModel'); 

const createOutlate = async (req, res) => {
  try {
    const OutlateCount = await OutlateMaster.countDocuments();
    const newOutlateData = {
      ...req.body,
      Outlet_Id: OutlateCount + 1 
    };
    const outlate = await OutlateMaster.create(newOutlateData);
    res.status(201).json({ success: true, data: outlate });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

const getOutlates = async (req, res) => {
  try {
    const outlates = await OutlateMaster.find().populate("Rest_id");
    res.status(200).json({ success: true, data: outlates });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getOutlateById = async (req, res) => {
  try {
    const outlate = await OutlateMaster.findById(req.params.id).populate("Rest_id");
    if (!outlate) {
      return res.status(404).json({ success: false, message: 'Outlate not found' });
    }
    res.status(200).json({ success: true, data: outlate });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const updateOutlate = async (req, res) => {
  try {
    const updatedOutlate = await OutlateMaster.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedOutlate) {
      return res.status(404).json({ success: false, message: 'Outlate not found' });
    }
    res.status(200).json({ success: true, data: updatedOutlate });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

const deleteOutlate = async (req, res) => {
  try {
    const deletedOutlate = await OutlateMaster.findByIdAndDelete(req.params.id);
    if (!deletedOutlate) {
      return res.status(404).json({ success: false, message: 'Outlate not found' });
    }
    res.status(200).json({ success: true, message: 'Outlate deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  createOutlate,
  getOutlates,
  getOutlateById,
  updateOutlate,
  deleteOutlate
};
