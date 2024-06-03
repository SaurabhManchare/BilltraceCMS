const mongoose = require('mongoose');
const { DateTime } = require("luxon");

const RestaurantSchema = new mongoose.Schema({
    Rest_id: {
        type: Number,
        unique: true 
    },
    Rest_Name: {
        type: String,
        required: true
    },
    Address: {
        type: String,
        required: true
    },
    Mobile_No: {
        type: String,
        required: true,
        maxlength: 10 
    },
    Creted_by:{
    type: String,
    },
    Rest_CreatedDate:{
        type: String,
        default: () => DateTime.now().setZone('Asia/Kolkata').toLocaleString(DateTime.DATETIME_SHORT), 
      },
    Rest_Status: {
        type: String,
        enum: ['Active', 'InActive'], // Corrected typo in enum value
        default: 'Active' 
    }
});

RestaurantSchema.pre('save', async function(next) {
    try {
        if (!this.Rest_id) {
            const maxDoc = await this.constructor.findOne({}, {}, { sort: { 'Rest_id': -1 } });
            this.Rest_id = maxDoc ? maxDoc.Rest_id + 1 : 1;
        }
        next();
    } catch (err) {
        return next(err);
    }
});

const RestaurantModel = mongoose.model('Restaurant', RestaurantSchema);

module.exports = RestaurantModel;
