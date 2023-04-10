const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;

const questionSchema = new mongoose.Schema({
    testname: {
        type: ObjectId,
        ref: "Test",
        required : [true, 'Must belong to a test'],
    },
    question: {
        type: String,
        required: true,
      },
},
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Question", questionSchema);
