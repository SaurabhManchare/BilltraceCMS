const express = require('express');
const router = express.Router();
const {
    createCall,
    getAllCalls,
    getCallById,
    updateCall,
    deleteCall
} = require('../controller/CallMasterController');

// Routes
router.post('/Calls', createCall);
router.get('/Calls', getAllCalls);
router.get('/Calls/:id', getCallById);
router.put('/Calls/:id', updateCall);
router.delete('/Calls/:id', deleteCall);

module.exports = router;
