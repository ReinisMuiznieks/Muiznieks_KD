const mongoose = require('mongoose')

const cardSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
    });

module.exports = mongoose.model('Card', cardSchema)
