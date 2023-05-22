const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;

const testSchema = new mongoose.Schema({
  testname: {
    type: String,
    required: true,
  },
  categories: [{
    category: {
      type: ObjectId,
      ref: "Category",
      required : [true, 'Must belong to a category'],
    }
  }]
},
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Test", testSchema);
