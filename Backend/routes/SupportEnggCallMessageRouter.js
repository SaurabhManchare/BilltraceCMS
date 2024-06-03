const express = require('express');
const router = express.Router();
const {
    createSupportEnggData,
  getSupportEnggData,
  getSupportEnggDataByID,
  updateSupportEnggData,
  deleteSupportEnggData
} = require('../controller/SupportEnggCallMessagecontroller');

// Routes
router.post('/SupportEngg', createSupportEnggData);
router.get('/SupportEngg', getSupportEnggData);
router.get('/SupportEngg/:id', getSupportEnggDataByID);
router.put('/SupportEngg/:id', updateSupportEnggData);
router.delete('/SupportEngg/:id', deleteSupportEnggData);

module.exports = router;
