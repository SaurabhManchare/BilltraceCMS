const mongoose = require('mongoose');
const { DateTime } = require("luxon");

const userschema = new mongoose.Schema({
  image: {
    type: String
  },
  User_Id: {
    type: Number,
    unique: true
  },
  User_Name: {
    type: String,
    required: true,
    trim: true 
  },
  Mobile_No: {
    type: String,
    required: true,
    maxlength: 10
  },
  User_Email:{
    type: String,
    required: true,
  },
  User_Roleid:{
    type: Number,
    required: true,
  },
  User_Password: {
    type: String,
    required: true,
    minlength: 6 
  },
  User_NewPassword: {
    type: String,
    minlength: 6 
  },
  User_CreatedDate:{
    type: String,
    default: () => DateTime.now().setZone('Asia/Kolkata').toLocaleString(DateTime.DATETIME_SHORT), 
  },
  User_CreatedBy:{
    type: String,
    
  },
  Status: {
    type: String,
    enum: ['Active', 'Inactive'], 
    default: 'Active'
  }
});

// Pre-save hook to generate unique UserId
userschema.pre('save', async function(next) {
  if (!this.User_Id) {
    try {
      const maxDoc = await usertable.findOne({}, {}, { sort: { 'User_Id': -1 } });
      this.User_Id = maxDoc ? maxDoc.User_Id + 1 : 1;
    } catch (error) {
      return next(error);
    }
  }
  next();
});

const usertable = mongoose.model("Userdata", userschema);

module.exports = usertable;
