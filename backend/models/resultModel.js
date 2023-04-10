const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
  testname: {
    type: String,
    required: true,
  },
  username : { type : String },
  result : { type : Array, default : []},
  attempts : { type : Number, default : 0},
  points : { type : Number, default : 0},
},
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Result", resultSchema);
