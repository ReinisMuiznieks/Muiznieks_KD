const asyncHandler = require('express-async-handler')
const Card = require('../models/cardModel')
const e = require('express')

// Get cards
const getCard = asyncHandler(async (req, res) => {
  const cards = await Card.find()

  res.status(200).json(cards)
})

// Get card by id
const getCardbyId = asyncHandler(async (req, res) => {
  const card = await Card.findById(req.params.id)

  res.status(200).json(card)
})


// Gets cards by category id
const getCardsbyCategory = asyncHandler(async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;

  try {
    let cards

    if (qNew) {
      cards = await Card.find().populate("category").sort({ createdAt: -1 }).limit(1);
      
    } else if (qCategory) {
      cards = await Card.find({
        category:
        { 
          $in: 
          [qCategory]
        }}).populate("category")
    } else {
      cards = await Card.find().populate("category");
    }
    
    res.status(200).json(cards);
  } catch (err) {
    res.status(500).json(err);
  }
});


// Create card
const addCard = asyncHandler(async(req,res) => {
  const { lv_word, eng_word, description, image, category, audio } = req.body

  
  const card = await Card.create({
      lv_word,
      eng_word,
      image,
      category,
      audio
  })

  if(card) {
      res.status(201).json({
          _id: card.id,
          lv_word: card.lv_word,
          eng_word: card.eng_word,
          image: card.image,
          audio: card.audio,
          category: card.category
      })
  } else {
      res.status(400)
      throw new Error('Invalid card data')
  }
})

// Update card
const updateCard = asyncHandler(async (req, res) => {
  const card = await Card.findById(req.params.id)

  if (!card) {
    res.status(400)
    throw new Error('Card not found')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  const updateCard = await Card.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })

  res.status(200).json(updateCard)
})

// Delete card
const deleteCard = asyncHandler(async (req, res) => {
  const card = await Card.findById(req.params.id)

  if (!card) {
    res.status(400)
    throw new Error('Card not found')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  await card.remove()

  res.status(200).json({ id: req.params.id })
})

module.exports ={
  addCard,
  getCard,
  updateCard,
  deleteCard,
  getCardbyId,
  getCardsbyCategory
}