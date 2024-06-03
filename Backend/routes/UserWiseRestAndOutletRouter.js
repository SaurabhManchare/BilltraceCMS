const express = require('express');
const router = express.Router();
const {
    createUserWiseRestAndOutlet,
  getUserWiseRestAndOutlet,
  getUserWiseRestAndOutletById,
  updateUserWiseRestAndOutlet,
  deleteUserWiseRestAndOutlet,
  
  
} = require('../controller/UserWiseRestAndOutlatMasterController'); 

// Routes
router.post('/UserWiseRestAndOutlet', createUserWiseRestAndOutlet);
router.get('/UserWiseRestAndOutlet', getUserWiseRestAndOutlet);
router.get('/UserWiseRestAndOutlet/:id', getUserWiseRestAndOutletById);
router.put('/UserWiseRestAndOutlet/:id', updateUserWiseRestAndOutlet);
router.delete('/UserWiseRestAndOutlet/:id', deleteUserWiseRestAndOutlet);

module.exports = router;
