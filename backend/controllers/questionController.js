const asyncHandler = require('express-async-handler')
const Question = require('../models/questionModel')
const router = require('express')

//Get Question(s)
const getQuestions = asyncHandler(async (req,res) =>{
    Question.find().then(data => {
        res.json(data)
    }).catch(e => {
        res.json({ message: e })
    })
})

//GET Test by testId
const getQuestion = asyncHandler(async (req,res) =>{
    try {
        Question.find({ _id: req.params.id }).then(data => {
            res.json(data)
        })
    } catch (err) {
        res.json({ message: err });
    }
});


const addQuestion = asyncHandler(async (req,res) =>{
    const question = new Question({
        testname: req.body.testname,
        question: req.body.question
    })
    question.save().then(data => {
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

const deleteQuestion = asyncHandler(async (req,res) =>{
    Question.deleteOne({ _id: req.params.id })
        .then(data => {
            res.json(data)
        }).catch(e => {
            res.json({ message: e })
        })
})

module.exports = {
    getQuestion,
    getQuestions,
    addQuestion,
    deleteQuestion,
}
