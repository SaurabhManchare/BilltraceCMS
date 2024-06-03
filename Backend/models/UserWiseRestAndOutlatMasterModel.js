const mongoose = require('mongoose');
const { DateTime } = require("luxon");

const UserWiseRestAndOutletSchema = new mongoose.Schema({
    UserRestOutlatIDMaster_id: {
        type: Number,
        unique: true 
    },
    UserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Userdata', 
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
    Created_by: {
        type: String,
    },
UserRestOutlatIDMasterCreatedDate: {
        type: String,
        default: DateTime.now().setZone('Asia/Kolkata').toLocaleString(DateTime.DATETIME_SHORT)
    },
UserRestOutlatIDMaster_Status: {
        type: String,
        enum: ['Active', 'InActive'], 
        default: 'Active' 
    }
});

UserWiseRestAndOutletSchema.pre('save', async function(next) {
    try {
        if (!this.UserRestOutlatIDMaster_id) {
            const maxDoc = await this.constructor.findOne({}, {}, { sort: { 'UserRestOutlatIDMaster_id': -1 } });
            this.UserRestOutlatIDMaster_id = maxDoc ? maxDoc.UserRestOutlatIDMaster_id + 1 : 1;
        }
        next();
    } catch (err) {
        return next(err);
    }
});

const UserRestOutlatIDMaster = mongoose.model('UserRestOutlatIDMaster', UserWiseRestAndOutletSchema);

module.exports = UserRestOutlatIDMaster;
