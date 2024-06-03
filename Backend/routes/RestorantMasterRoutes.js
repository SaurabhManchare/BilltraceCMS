const express = require('express');
const router = express.Router();
const RestorantMasterController = require('../controller/RestorantMasterController');

// Create a new restaurant
router.post('/restaurants', RestorantMasterController.createRestaurant);

// Get all restaurants
router.get('/restaurants', RestorantMasterController.getAllRestaurants);

// Get a restaurant by ID
router.get('/restaurants/:id', RestorantMasterController.getRestaurantById);

// Update a restaurant by ID
router.put('/restaurants/:id', RestorantMasterController.updateRestaurantById);

// Delete a restaurant by ID
router.delete('/restaurants/:id', RestorantMasterController.deleteRestaurantById);

module.exports = router;
