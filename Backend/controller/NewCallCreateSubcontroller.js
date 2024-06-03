const NewCallSubCategory = require('../models/NewCallCreateSubModel');

const createSubCategory = async (req, res) => {
  try {
    const newCallSubCategoryID = await NewCallSubCategory.countDocuments();
    const newCategoryData = {
      ...req.body,
      newCallSubCategoryID: newCallSubCategoryID + 1 
    };
    const category = await NewCallSubCategory.create(newCategoryData);
    res.status(201).json({ success: true, data: category });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

const getSubCategories = async (req, res) => {
  try {
    const categories = await NewCallSubCategory.find().populate("newCallCategoryID");
    res.status(200).json({ success: true, data: categories });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const getSubCategoryById = async (req, res) => {
  try {
    const category = await NewCallSubCategory.findById(req.params.id).populate("newCallCategoryID");
    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }
    res.status(200).json({ success: true, data: category });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const updateSubCategory = async (req, res) => {
  try {
    const updatedCategory = await NewCallSubCategory.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCategory) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }
    res.status(200).json({ success: true, data: updatedCategory });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

const deleteSubCategory = async (req, res) => {
  try {
    const deletedCategory = await NewCallSubCategory.findByIdAndDelete(req.params.id);
    if (!deletedCategory) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }
    res.status(200).json({ success: true, message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  createSubCategory,
  getSubCategories,
  getSubCategoryById,
  updateSubCategory,
  deleteSubCategory
};
