const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;

const UserExamSchema = new mongoose.Schema({
    test: {
        type: ObjectId,
        required: true,
        ref: "Test"
    },
    user: {
        type: ObjectId,
        required: true,
        ref: "User"
    },
    score: {
        type: Number,
        default: 0
    },
    completed: {
        type: Boolean,
        default: false
    },
},
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("UserExam", UserExamSchema);