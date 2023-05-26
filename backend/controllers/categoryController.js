const asyncHandler = require('express-async-handler')
const Category = require('../models/categoryModel')
const e = require('express')
const Test = require('../models/testModel');

// Get categories
const getCategories = asyncHandler(async (req,res) =>{
  Category.find().then(data => {
      res.json(data)
  }).catch(e => {
      res.json({ message: e })
  })
})

const getCategory = asyncHandler(async (req, res) => {
  try {
    const test = await Test.findById(req.params.id).populate('categories.category');
    if (!test) {
      return res.status(404);
    }
    const categories = test.categories.map((category) => category.category);
    res.json(categories);
  } catch (err) {
    res.status(500);
  }
});
   

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

// Update category
const updateCategory = asyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id)
  
    if (!category) {
      res.status(400)
      throw new Error('Category not found')
    }
  
    // Check for user
    if (!req.user) {
      res.status(401)
      throw new Error('User not found')
    }

    const updateCategory = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
    res.status(200).json(updateCategory)
  })
  
// Delete category
  const deleteCategory = asyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id)
  
    if (!category) {
      res.status(400)
      throw new Error('Category not found')
    }
  
    // Check for user
    if (!req.user) {
      res.status(401)
      throw new Error('User not found')
    }
  
    await category.remove()
  
    res.status(200).json({ id: req.params.id })
  })

module.exports ={
    addCategory,
    getCategory,
    getCategories,
    updateCategory,
    deleteCategory,
}