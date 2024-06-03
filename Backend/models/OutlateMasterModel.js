const mongoose = require("mongoose");
const { Schema } = mongoose;
const { DateTime } = require("luxon"); 

const OutletMasterSchema = new mongoose.Schema({
  Rest_id: {
    type: Schema.Types.ObjectId,
    ref: "Restaurant",
  },
  Outlet_Id: {
    type: Number,
    unique: true,
  },
  Outlet_name: {
    type: String,
    required: true,
  },
  Address: {
    type: String,
    required: true,
  },
  Mobile_No: {
    type: String,
    required: true,
    maxlength: 10,
  },
  Created_by: {
    type: String,
  },
  Rest_CreatedDate: {
    type: String,
    default: () => DateTime.now().setZone('Asia/Kolkata').toLocaleString(DateTime.DATETIME_SHORT),
  },
  Outlet_Status: {
    type: String,
    enum: ['Active', 'InActive'],
    default: 'Active',
  }
});

OutletMasterSchema.pre("save", async function (next) {
  try {
    if (!this.Outlet_Id) {
      const maxDoc = await OutletMasterModel.findOne(
        {},
        {},
        { sort: { Outlet_Id: -1 } }
      );
      this.Outlet_Id = maxDoc ? maxDoc.Outlet_Id + 1 : 1;
    }
    next();
  } catch (error) {
    next(error);
  }
});


const OutletMasterModel = mongoose.model("OutletMaster", OutletMasterSchema);

module.exports = OutletMasterModel;
