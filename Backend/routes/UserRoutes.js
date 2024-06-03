const router = require("express").Router();
const {
    Signup,
    Login,
    ResetPassword,
    getUserData,
    getUserById
    
} = require("../controller/Auth-Controller");
const { GetUser } = require("../controller/User-Controller");
const veryfayTokan = require("../middlewares/veryfayToken");

// Create User
router.post("/Signup" , Signup);
router.post("/Login" , Login);
router.post("/ResetPassword", ResetPassword); 
router.get("/user" , veryfayTokan , GetUser);
router.get("/userdata" ,  getUserData);
router.get("/userById" ,  getUserById);

module.exports = router;