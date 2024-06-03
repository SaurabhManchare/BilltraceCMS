const mongoose = require("mongoose");
const { DateTime } = require("luxon"); 

const AdminToSupportEnggSchema = new mongoose.Schema({
  UserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Userdata', 
    required: true
  },
  OutletId:{
    type: mongoose.Schema.Types.ObjectId, 
    ref: "OutletMaster",
    required: true,
  },
  Call_Id: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: "CallsMaster",
    required: true,
  },
  AdminToSupportEngg_id: {
    type: Number,
    unique: true
  },
  Date: {
    type: String,
    default: () => DateTime.now().setZone('Asia/Kolkata').toLocaleString(DateTime.DATETIME_SHORT),
  }
});

AdminToSupportEnggSchema.pre('save', async function(next) {
  if (!this.AdminToSupportEngg_id) {
    try {
      const maxDoc = await CallsMaster.findOne({}, {}, { sort: { 'AdminToSupportEngg_id': -1 } });
      this.AdminToSupportEngg_id = maxDoc ? maxDoc.AdminToSupportEngg_id + 1 : 1;
    } catch (error) {
      return next(error);
    }
  }
  next();
});

const AdminToSupportEnggCall = mongoose.model("AdminToSupportEnggCall", AdminToSupportEnggSchema);

module.exports = AdminToSupportEnggCall;
