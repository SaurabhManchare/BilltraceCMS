const mongoose = require('mongoose');
const { DateTime } = require("luxon");

const SupportEnggSchema = new mongoose.Schema({
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
        type: mongoose.Schema.Types.ObjectId, 
        ref: "AdminToSupportEnggCall",
        required: true,
      },
    SupportEnggCallId: {
        type: Number,
        unique: true,
      
    },
    SupportEnggName:{
  type: String,
  required: true,
    },
    SupportEnggMobileNo:{
  type: String,
  required: true,
        },
    SupportEnggCall_Status: {
        type: String,
        enum: ['Call Accepted', 'Call Not Accepted', 'Call Resolve'],
        required: true
    },
    textAreaReasons: {
        type: String,
       
    },
    howtosolveinformation:{
    type: String,
    required: true,
    },
    CategoryCreatedDate: {
        type: String,
        default: () => DateTime.now().setZone('Asia/Kolkata').toLocaleString(DateTime.DATETIME_SHORT)
    }
});


SupportEnggSchema.pre('save', async function(next) {
    try {
        if (!this.SupportEnggCallId) {
            const maxDoc = await this.constructor.findOne({}, {}, { sort: { 'SupportEnggCallId': -1 } });
            this.SupportEnggCallId = maxDoc ? maxDoc.SupportEnggCallId + 1 : 1;
        }
        next();
    } catch (err) {
        return next(err);
    }
});

const SupportEnggData = mongoose.model('SupportEnggData', SupportEnggSchema);

module.exports = SupportEnggData;
