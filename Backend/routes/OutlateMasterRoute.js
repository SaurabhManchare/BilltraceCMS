const express = require('express');
const router = express.Router();
const {
  createOutlate,
  getOutlates,
  getOutlateById,
  updateOutlate,
  deleteOutlate
} = require('../controller/OutlateMasterController');

// Routes
router.post('/outlates', createOutlate);
router.get('/outlates', getOutlates);
router.get('/outlates/:id', getOutlateById);
router.put('/outlates/:id', updateOutlate);
router.delete('/outlates/:id', deleteOutlate);

module.exports = router;
