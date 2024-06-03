const mongoose = require('mongoose');
const { DateTime } = require("luxon");

const CallCloseSchema = new mongoose.Schema({
  UserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Userdata',
    required: true
  },
  OutletId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'OutletMaster',
    required: true
  },
  Call_Id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CallsMaster',
    required: true
  },
  AdminToSupportEngg_id: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: "AdminToSupportEnggCall",
    required: true,
  },
  SupportEnggCallId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SupportEnggData',
    required: true
  },
  CallCloseId: {
    type: Number,
    unique: true
  },
  SupportEnggName:{
    type: String,
    required: true
  },
  CallCloseStatus: {
    type: String,
    enum: ['Call Close'], 
    required: true
  },
  CallCloseDate: {
    type: String,
    default: () => DateTime.now().setZone('Asia/Kolkata').toLocaleString(DateTime.DATETIME_SHORT)
  }
});

CallCloseSchema.pre('save', async function(next) {
  try {
    if (!this.CallCloseId) {
      const maxDoc = await this.constructor.findOne({}, {}, { sort: { 'CallCloseId': -1 } });
      this.CallCloseId = maxDoc ? maxDoc.CallCloseId + 1 : 1;
    }
    next();
  } catch (err) {
    return next(err);
  }
});

const CallCloseData = mongoose.model('CallCloseData', CallCloseSchema);

module.exports = CallCloseData;
