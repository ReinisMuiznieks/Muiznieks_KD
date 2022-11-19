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

// router.patch('/:id', (req, resp) => {
//     Test.updateOne({ _id: req.params.id }, {
//         $set: {
//             testname: req.body.testname,
//             passGrade: req.body.passGrade,
//             time: req.body.time,
//         }
//     }).then(data => {
//         resp.json(data)
//     }).catch(e => {
//         resp.json({ message: e })
//     })
// })

const deleteTest = asyncHandler(async (req,res) =>{
    Test.deleteOne({ _id: req.params.id })
        .then(data => {
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
}
