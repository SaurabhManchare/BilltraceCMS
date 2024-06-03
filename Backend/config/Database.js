const mongoose = require("mongoose");

const DbConnection = () => {
  try {
    mongoose
      .connect(process.env.Mongo_Url, {

      })
      .then(() => console.log("Database is Connected To Server"));
  } catch (error) {
    console.log("Database Is Not Connected To Server", error);
  }
};

module.exports = DbConnection;