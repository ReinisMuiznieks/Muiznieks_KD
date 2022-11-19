const mongoose = require("mongoose");

const testSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  testname: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
},
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Test", testSchema);
