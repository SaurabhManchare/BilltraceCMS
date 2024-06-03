const mongoose = require("mongoose");
const { Schema } = mongoose;
const { DateTime } = require("luxon");

const newCallSubCategorySchema = new mongoose.Schema({
  newCallCategoryID: {
    type: Schema.Types.ObjectId,
    ref: "NewCallCategory",
  },
  newCallSubCategoryID: {
    type: Number,
    unique: true,
  },
  newCallSubCategoryName: {
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
newCallSubCategorySchema.pre("save", async function (next) {
  try {
    if (!this.newCallSubCategoryID) {
      const maxDoc = await this.constructor.findOne(
        {},
        {},
        { sort: { newCallSubCategoryID: -1 } }
      );
      this.newCallSubCategoryID = maxDoc ? maxDoc.newCallSubCategoryID + 1 : 1;
    }
    next();
  } catch (err) {
    return next(err);
  }
});

const NewCallSubCategory = mongoose.model("NewCallSubCategory" , newCallSubCategorySchema);

module.exports = NewCallSubCategory;
