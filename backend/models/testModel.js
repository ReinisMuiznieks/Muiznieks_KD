const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;

const testSchema = new mongoose.Schema({
  testname: {
    type: String,
    required: true,
  },
  category: {
    type: ObjectId,
    ref: "Category",
    required : [true, 'Must belong to a category'],
},
  type: {
    type: ObjectId,
    ref: "Type",
    required : [true, 'Must belong to a type'],
  },
},
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Test", testSchema);
