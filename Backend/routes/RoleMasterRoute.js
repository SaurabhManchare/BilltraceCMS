const express = require('express');
const router = express.Router();
const {
    createRole,
    getAllRoles,
    getRoleById,
    updateRole,
    deleteRole,
} = require('../controller/RoleMasterController'); 

// Routes
router.post('/Role', createRole);
router.get('/Role', getAllRoles);
router.get('/Role/:id', getRoleById);
router.put('/Role/:id', updateRole);
router.delete('/Role/:id', deleteRole);

module.exports = router;
