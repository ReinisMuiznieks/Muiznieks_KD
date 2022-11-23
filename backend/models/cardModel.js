const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema;

const cardSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: false,
      },
      image: {
        type: String,
        required: true,
      },
      category: {
        type: ObjectId,
        ref: "Category",
        required : [true, 'Must belong to a category'],
    },
    });

module.exports = mongoose.model('Card', cardSchema)
