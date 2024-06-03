const express = require('express');
const router = express.Router();
const {
    createHelpCenterData,
    getAllHelpCenterDatas,
    getHelpCenterDataById,
    updateHelpCenterData,
    deleteHelpCenterData
} = require('../controller/HelpCenterController');

// Routes
router.post('/HelpVideo', createHelpCenterData);
router.get('/HelpVideo', getAllHelpCenterDatas);
router.get('/HelpVideo/:id', getHelpCenterDataById);
router.put('/HelpVideo/:id', updateHelpCenterData);
router.delete('/HelpVideo/:id', deleteHelpCenterData);

module.exports = router;
