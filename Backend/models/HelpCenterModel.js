const mongoose = require('mongoose');
const { DateTime } = require("luxon");

// Define the HelpCenterSchema with correct field names and options
const HelpCenterSchema = new mongoose.Schema({
  HelpLinkId: {
    type: Number,
    unique: true,
  },
  Name: {
    type: String,
    required: true
  },
  Category: {
    type: String,
    required: true
  },
  VideoLink: {
    type: String,
    required: true
  },
  CreatedDate: {
    type: String,
    default: () => DateTime.now().setZone('Asia/Kolkata').toLocaleString(DateTime.DATETIME_SHORT),
  },
});

// Pre-save hook to generate unique HelpLinkId
HelpCenterSchema.pre('save', async function(next) {
  if (!this.HelpLinkId) {
    try {
      const maxDoc = await HelpCenterData.findOne({}, {}, { sort: { 'HelpLinkId': -1 } });
      this.HelpLinkId = maxDoc ? maxDoc.HelpLinkId + 1 : 1;
    } catch (error) {
      return next(error); 
    }
  }
  next(); 
});


const HelpCenterData = mongoose.model('HelpCenterData', HelpCenterSchema);

module.exports = HelpCenterData;
