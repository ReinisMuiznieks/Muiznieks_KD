const asyncHandler = require('express-async-handler')
const Type = require('../models/typeModel')
const e = require('express')


// Get types
const getType = asyncHandler(async (req, res) => {
    const types = await Type.find()
  
    res.status(200).json(types)
  })


const addType = asyncHandler(async(req,res) => {
    const { name } = req.body

    // Create type
    const type = await Type.create({
        name
    })

    if(type) {
        res.status(201).json({
            _id: type.id,
            name: type.name
        })
    } else {
        res.status(400)
        throw new Error('Invalid type data')
    }
})

module.exports ={
    addType,
    getType
}