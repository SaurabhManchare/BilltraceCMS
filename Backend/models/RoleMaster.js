const mongoose = require('mongoose');

const RoleMasterSchema = new mongoose.Schema({
  Role_id: {
    type: Number,
    unique: true
  },
  Role_Name: {
    type: String,
    required: true
  }
});

// Pre-save hook to generate unique Role_id
RoleMasterSchema.pre('save', async function(next) {
  if (!this.Role_id) {
    try {
      const maxDoc = await RoleMaster.findOne({}, {}, { sort: { 'Role_id': -1 } });
      this.Role_id = maxDoc ? maxDoc.Role_id + 1 : 1;
    } catch (error) {
      return next(error);
    }
  }
  next();
});

const RoleMaster = mongoose.model("RoleMaster", RoleMasterSchema);

module.exports = RoleMaster;
