const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const UserTestSchema = new mongoose.Schema(
  {
    test: {
      type: ObjectId,
      required: true,
      ref: "Test",
    },
    user: {
      type: ObjectId,
      required: true,
      ref: "User",
    },
    score: {
      type: Number,
      default: 0,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    incorrectAnswers: [
      {
        question: {
          type: ObjectId,
        //   required: true,
        //   ref: "Question",
        },
        correctAnswer: {
          type: String,
        //   required: true,
        },
        userAnswer: {
          type: String,
        //   required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("UserTest", UserTestSchema);
