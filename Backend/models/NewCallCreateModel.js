const mongoose = require('mongoose');
const { DateTime } = require("luxon");


const newCallCategorySchema = new mongoose.Schema({
    newCallCategoryID: {
        type: Number,
        unique: true,
       
    },
    newCallCategoryName: {
        type: String,
        required: true
    },
    CategeryCreatedDate: {
        type: String,
        default: () => DateTime.now().setZone('Asia/Kolkata').toLocaleString(DateTime.DATETIME_SHORT),
      },
   
});

// Pre-save hook to generate unique ID
newCallCategorySchema.pre('save', async function(next) {
    try {
        if (!this.newCallCategoryID) {
            const maxDoc = await this.constructor.findOne({}, {}, { sort: { 'newCallCategoryID': -1 } });
            this.newCallCategoryID = maxDoc ? maxDoc.newCallCategoryID + 1 : 1;
        }
        next();
    } catch (err) {
        return next(err);
    }
});

const NewCallCategory = mongoose.model('NewCallCategory', newCallCategorySchema);

module.exports = NewCallCategory;
