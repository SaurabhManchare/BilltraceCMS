const express = require('express');
const router = express.Router();
const {
    createSubSubCategory,
    getSubSubCategories,
    getSubSubCategoryById,
    updateSubSubCategory,
    deleteSubSubCategory
} = require('../controller/NewCallCreateSubSubController');

// POST /SubCategery - Create a new SubCategery
router.post('/SubSubCategery', createSubSubCategory);

// GET /SubCategery - Get all SubCategery
router.get('/SubSubCategery', getSubSubCategories);

// GET /SubCategery/:id - Get a single SubCategery by ID
router.get('/SubSubCategery/:id', getSubSubCategoryById);

// PUT /SubCategery/:id - Update a SubCategery by ID
router.put('/SubSubCategery/:id', updateSubSubCategory);

// DELETE /SubCategery/:id - Delete a SubCategery by ID
router.delete('/SubSubCategery/:id', deleteSubSubCategory);


module.exports = router;
