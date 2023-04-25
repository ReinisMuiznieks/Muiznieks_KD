const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;

const questionSchema = new mongoose.Schema({
    test: {
        type: ObjectId,
        ref: "Test",
        required : [true, 'Must belong to a test'],
    },
    card: {
      type: ObjectId,
      ref: "Card",
      required : [false],
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
