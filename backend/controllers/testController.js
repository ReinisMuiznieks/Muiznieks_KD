const asyncHandler = require('express-async-handler')
const Test = require('../models/testModel')
const router = require('express')

//Get Test(s)
const getTests = asyncHandler(async (req,res) =>{
    Test.find().then(data => {
        res.json(data)
    }).catch(e => {
        res.json({ message: e })
    })
})

//GET Test by testId
const getTest = asyncHandler(async (req,res) =>{
    try {
        Test.find({ _id: req.params.id }).then(data => {
            res.json(data)
        })
    } catch (err) {
        res.json({ message: err });
    }
});

const addTest = asyncHandler(async (req,res) =>{
    const test = new Test({
        userId: req.body.userId,
        testname: req.body.testname,
        category: req.body.category,
        type: req.body.type,
    })
    test.save().then(data => {
        res.json(data)
    }).catch(e => {
        res.json({ message: e })
    })
})

const deleteTest = asyncHandler(async (req,res) =>{
    Test.deleteOne({ _id: req.params.id })
        .then(data => {
            res.json(data)
        }).catch(e => {
            res.json({ message: e })
        })
})

// Update test
const updateTest = asyncHandler(async (req, res) => {
    const test = await Test.findById(req.params.id)
  
    if (!test) {
      res.status(400)
      throw new Error('Test not found')
    }
  
    // Check for user
    if (!req.user) {
      res.status(401)
      throw new Error('User not found')
    }

    const updateTest = await Test.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
  
    res.status(200).json(updateTest)
  })

module.exports = {
    getTests,
    getTest,
    addTest,
    deleteTest,
    updateTest,
}
