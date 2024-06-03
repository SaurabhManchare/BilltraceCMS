const mongoose = require("mongoose");
const { Schema } = mongoose;
const { DateTime } = require("luxon");

const newCallSubSubCategorySchema = new mongoose.Schema({
  
  newCallSubCategoryID: {
    type: Schema.Types.ObjectId,
    ref: "NewCallSubCategory",
  },
  newCallSubSubCategoryID:{
    type: Number,
    unique: true,
  },
  newCallSubSubCategoryName: {
    type: String,
    required: true,
  },
  CategerySubCreatedDate: {
    type: String,
    default: () =>
      DateTime.now()
        .setZone("Asia/Kolkata")
        .toLocaleString(DateTime.DATETIME_SHORT),
  },
});

// Pre-save hook to generate unique ID
newCallSubSubCategorySchema.pre("save", async function (next) {
  try {
    if (!this.newCallSubSubCategoryID) {
      const maxDoc = await this.constructor.findOne(
        {},
        {},
        { sort: { newCallSubSubCategoryID: -1 } }
      );
      this.newCallSubSubCategoryID = maxDoc ? maxDoc.newCallSubSubCategoryID + 1 : 1;
    }
    next();
  } catch (err) {
    return next(err);
  }
});

const NewCallSubSubCategory = mongoose.model("NewCallSubSubCategory" , newCallSubSubCategorySchema);

module.exports = NewCallSubSubCategory;
