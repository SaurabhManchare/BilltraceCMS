const CallCloseData = require('../models/CallCloseStatusModel');

const createCallCloseData = async (req, res) => {
  try {
    const newCallCloseData = await CallCloseData.create(req.body);
    res.status(201).json({ success: true, data: newCallCloseData });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

const getCallCloseData = async (req, res) => {
  try {
    const callCloseData = await CallCloseData.find().populate('UserId').populate('OutletId').populate('Call_Id').populate('AdminToSupportEngg_id').populate('SupportEnggCallId');
    res.status(200).json({ success: true, data: callCloseData });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getCallCloseDataByID = async (req, res) => {
  try {
    const callCloseData = await CallCloseData.findById(req.params.id).populate('UserId').populate('OutletId').populate('Call_Id').populate('AdminToSupportEngg_id').populate('SupportEnggCallId');
     
    if (!callCloseData) {
      return res.status(404).json({ success: false, message: 'CallCloseData not found' });
    }
    res.status(200).json({ success: true, data: callCloseData });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const updateCallCloseData = async (req, res) => {
  try {
    const updatedCallCloseData = await CallCloseData.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedCallCloseData) {
      return res.status(404).json({ success: false, message: 'CallCloseData not found' });
    }
    res.status(200).json({ success: true, data: updatedCallCloseData });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

const deleteCallCloseData = async (req, res) => {
  try {
    const deletedCallCloseData = await CallCloseData.findByIdAndDelete(req.params.id);
    if (!deletedCallCloseData) {
      return res.status(404).json({ success: false, message: 'CallCloseData not found' });
    }
    res.status(200).json({ success: true, message: 'CallCloseData deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  createCallCloseData,
  getCallCloseData,
  getCallCloseDataByID,
  updateCallCloseData,
  deleteCallCloseData
};
