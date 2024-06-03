const express = require('express');
const router = express.Router();
const {
    createSubCategory,
    getSubCategories,
    getSubCategoryById,
    updateSubCategory,
    deleteSubCategory
} = require('../controller/NewCallCreateSubcontroller');

// POST /SubCategery - Create a new SubCategery
router.post('/SubCategery', createSubCategory);

// GET /SubCategery - Get all SubCategery
router.get('/SubCategery', getSubCategories);

// GET /SubCategery/:id - Get a single SubCategery by ID
router.get('/SubCategery/:id', getSubCategoryById);

// PUT /SubCategery/:id - Update a SubCategery by ID
router.put('/SubCategery/:id', updateSubCategory);

// DELETE /SubCategery/:id - Delete a SubCategery by ID
router.delete('/SubCategery/:id', deleteSubCategory);


module.exports = router;
