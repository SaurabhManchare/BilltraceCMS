const express = require('express');
const router = express.Router();
const {
    createAdminToSupportEngg,
    getAdminToSupportEngg,
    getAdminToSupportEnggByID,
    updateAdminToSupportEngg,
    deleteAdminToSupportEngg
} = require('../controller/AdminToSupportEnggCallController');

// Routes
router.post('/AdminToSupportEngg', createAdminToSupportEngg);
router.get('/AdminToSupportEngg', getAdminToSupportEngg);
router.get('/AdminToSupportEngg/:id', getAdminToSupportEnggByID);
router.put('/AdminToSupportEngg/:id', updateAdminToSupportEngg);
router.delete('/AdminToSupportEngg/:id', deleteAdminToSupportEngg);

module.exports = router;
