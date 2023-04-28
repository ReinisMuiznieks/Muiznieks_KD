const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;

const questionSchema = new mongoose.Schema({
    test: {
        type: ObjectId,
        ref: "Test",
        required : [true, 'Must belong to a test'],
    },
    card: {
      type: String,
      required : true,
    },
    question: {
        type: String,
        required: true,
      },
    options: [{
      option: {
          type: String,
      },
      isCorrect: {
          type: Boolean,
          default: false
      }
  }],
},
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Question", questionSchema);
