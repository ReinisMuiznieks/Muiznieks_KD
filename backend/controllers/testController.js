const asyncHandler = require('express-async-handler')
const Test = require('../models/testModel')
const router = require('express')

// get Test
const getTests = asyncHandler(async (req,res) =>{
    Test.find().then(data => {
        res.json(data)
    }).catch(e => {
        res.json({ message: e })
    })
})

// gET Test by testId
const getTest = asyncHandler(async (req,res) =>{
    try {
        Test.find({ _id: req.params.id }).then(data => {
            res.json(data)
        })
    } catch (err) {
        res.json({ message: err });
    }
});

// add Test
const addTest = asyncHandler(async (req,res) =>{
    const test = new Test({
        userId: req.body.userId,
        testname: req.body.testname,
        categories: req.body.categories,
    })
    test.save().then(data => {
        res.json(data)
    }).catch(e => {
        res.json({ message: e })
    })
})

// delete Test
const deleteTest = asyncHandler(async (req,res) =>{
    Test.deleteOne({ _id: req.params.id })
        .then(data => {
            res.json(data)
        }).catch(e => {
            res.json({ message: e })
        })
})

// update Test
const updateTest = asyncHandler(async (req, res) => {
    Test.updateOne({ _id: req.params.id }, {
        $push: {
            categories: req.body.categories,
        }
    }).then(data => {
        res.json(data)
    }).catch(e => {
        res.json({ message: e })
    })
})
  
module.exports = {
    getTests,
    getTest,
    addTest,
    deleteTest,
    updateTest,
}
