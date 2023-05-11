const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const UserLearnSchema = new mongoose.Schema(
  {
    category: {
      type: ObjectId,
      required: true,
      ref: "Category",
    },
    user: {
      type: ObjectId,
      required: true,
      ref: "User",
    },
    progress: {
      type: Number,
      default: 0,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("UserLearn", UserLearnSchema);
