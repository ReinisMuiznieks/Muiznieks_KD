const asyncHandler = require('express-async-handler')
const Card = require('../models/cardModel')
const e = require('express')

// Get category
const getCard = asyncHandler(async (req, res) => {
  const cards = await Card.find()

  res.status(200).json(cards)
})

const addCard = asyncHandler(async(req,res) => {
  const { title, description, image } = req.body

  // Create card
  const card = await Card.create({
      title,
      description,
      image,
  })

  if(card) {
      res.status(201).json({
          _id: card.id,
          title: card.title,
          description: card.description,
          image: card.image,
      })
  } else {
      res.status(400)
      throw new Error('Invalid card data')
  }
})


// Update category
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
}