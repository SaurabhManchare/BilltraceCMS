const NewCallSubSubCategory = require('../models/NewCallCreateSubSubModel');

const createSubSubCategory = async (req, res) => {
  try {
    const newSubSubCategory = await NewCallSubSubCategory.create(req.body);
    res.status(201).json({ success: true, data: newSubSubCategory });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

const getSubSubCategories = async (req, res) => {
  try {
    const categories = await NewCallSubSubCategory.find().populate("newCallSubCategoryID");
    res.status(200).json({ success: true, data: categories });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getSubSubCategoryById = async (req, res) => {
  try {
    const category = await NewCallSubSubCategory.findById(req.params.id).populate("newCallSubCategoryID");
    if (!category) {
      return res.status(404).json({ success: false, message: 'SubSubCategory not found' });
    }
    res.status(200).json({ success: true, data: category });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const updateSubSubCategory = async (req, res) => {
  try {
    const updatedSubSubCategory = await NewCallSubSubCategory.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedSubSubCategory) {
      return res.status(404).json({ success: false, message: 'SubSubCategory not found' });
    }
    res.status(200).json({ success: true, data: updatedSubSubCategory });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


const deleteSubSubCategory = async (req, res) => {
  try {
    const deletedSubSubCategory = await NewCallSubSubCategory.findByIdAndDelete(req.params.id);
    if (!deletedSubSubCategory) {
      return res.status(404).json({ success: false, message: 'SubSubCategory not found' });
    }
    res.status(200).json({ success: true, message: 'SubSubCategory deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  createSubSubCategory,
  getSubSubCategories,
  getSubSubCategoryById,
  updateSubSubCategory,
  deleteSubSubCategory
};
