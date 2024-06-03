const express = require('express');
const router = express.Router();
const {
    createCallCloseData,
    getCallCloseData,
    getCallCloseDataByID,
    updateCallCloseData,
    deleteCallCloseData
} = require('../controller/CallCloseStatusController');

// Routes
router.post('/CallCloseStatus', createCallCloseData);
router.get('/CallCloseStatus', getCallCloseData);
router.get('/CallCloseStatus/:id', getCallCloseDataByID);
router.put('/CallCloseStatus/:id', updateCallCloseData);
router.delete('/CallCloseStatus/:id', deleteCallCloseData);

module.exports = router;
