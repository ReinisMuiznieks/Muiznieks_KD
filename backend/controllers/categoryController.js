const asyncHandler = require('express-async-handler')
const Category = require('../models/categoryModel')
const e = require('express')

// Get category
const getCategory = asyncHandler(async (req, res) => {
    const categories = await Category.find()
  
    res.status(200).json(categories)
  })

const addCategory = asyncHandler(async(req,res) => {
    const { name } = req.body

    // Create category
    const category = await Category.create({
        name
    })

    if(category) {
        res.status(201).json({
            _id: category.id,
            name: category.name
        })
    } else {
        res.status(400)
        throw new Error('Invalid category data')
    }
})

module.exports ={
    addCategory,
    getCategory
}