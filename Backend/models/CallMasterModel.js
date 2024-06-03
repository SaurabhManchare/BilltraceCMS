const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const CallsMasterSchema = new mongoose.Schema({
  UserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Userdata', // Reference to the 'Userdata' model
    required: true
  },
  RestorantId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Restaurant",
    required: true,
  },
  OutletId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: "OutletMaster",
    required: true,
  },
  Call_Id: {
    type: Number,
    unique: true
  },
  CallsType: {
    type: String,
    required: true,
  },
  Product: {
    type: String,
    required: true,
  },
  Problem: {
    type: String,
    required: true,
  },
  TextArea: {
    type: String,
  },
  PhotoVideo: {
    type: String,
  },
  Call_Status: {
    type: String,
    enum: ['Active', 'Inactive'], 
    default: 'Active'
  },
  Date: {
    type: String,
    default: () => DateTime.now().setZone('Asia/Kolkata').toLocaleString(DateTime.DATETIME_SHORT),
  }
});

CallsMasterSchema.pre('save', async function(next) {
  if (!this.Call_Id) {
    try {
      const maxDoc = await CallsMaster.findOne({}, {}, { sort: { 'Call_Id': -1 } });
      this.Call_Id = maxDoc ? maxDoc.Call_Id + 1 : 1;
    } catch (error) {
      return next(error);
    }
  }
  next();
});

const CallsMaster = mongoose.model("CallsMaster", CallsMasterSchema);

module.exports = CallsMaster;
