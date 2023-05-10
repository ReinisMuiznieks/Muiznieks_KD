const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;

const answerSchema = new mongoose.Schema(
  {
    question: {
      type: ObjectId,
      ref: "Question",
      required: [true, "Must belong to a question"],
    },
    answer: {
      type: String,
      required: true,
    },
    isCorrect: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);


module.exports = mongoose.model("Answer", answerSchema);
