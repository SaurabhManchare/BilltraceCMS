const express = require('express');
const router = express.Router();
const {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory
} = require('../controller/NewCallCreateController');

// POST /Categery - Create a new Categery
router.post('/Categery', createCategory);

// GET /Categery - Get all Categery
router.get('/Categery', getCategories);

// GET /Categery/:id - Get a single Categery by ID
router.get('/Categery/:id', getCategoryById);

// PUT /Categery/:id - Update a Categery by ID
router.put('/Categery/:id', updateCategory);

// DELETE /Categery/:id - Delete a Categery by ID
router.delete('/Categery/:id', deleteCategory);


module.exports = router;
