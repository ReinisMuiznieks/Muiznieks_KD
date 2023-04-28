const asyncHandler = require('express-async-handler')
const Question = require('../models/questionModel')
const router = require('express')

//Get Question(s)
// const getQuestions = asyncHandler(async (req,res) =>{
//     Question.find().then(data => {
//         res.json(data)
//     }).catch(e => {
//         res.json({ message: e })
//     })
// })

const getQuestions = asyncHandler(async (req, res) => {
    const questions = await Question.find()
  
    res.status(200).json(questions)
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


// const addQuestion = asyncHandler(async (req,res) =>{
//     const question = new Question({
//         testname: req.body.testname,
//         question: req.body.question
//     })
//     question.save().then(data => {
//         res.json(data)
//     }).catch(e => {
//         res.json({ message: e })
//     })
// })

// Create question
const addQuestion = asyncHandler(async(req,res) => {
  const { test, question, card, options, correctOption } = req.body

  
  const createQuestion = await Question.create({
      test,
      question,
      card,
      options,
      correctOption
  })

  if(createQuestion) {
      res.status(201).json({
          _id: createQuestion.id,
          question: createQuestion.question,
          test: createQuestion.test,
          card: createQuestion.card,
          options: createQuestion.options,
          correctOption: createQuestion.correctOption
      })
  } else {
      res.status(400)
      throw new Error('Invalid question data')
  }
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

// Gets questions by test id
const getQuestionsByTest = asyncHandler(async (req, res) => {
    const qNew = req.query.new;
    const qTest = req.query.test;
  
    try {
      let questions
  
      if (qNew) {
        questions = await Question.find().populate("test").sort({ createdAt: -1 }).limit(1);
        
      } else if (qTest) {
        questions = await Question.find({
            test:
          { 
            $in: 
            [qTest]
          }}).populate("test")
      } else {
        questions = await Question.find().populate("test");
      }
      
      res.status(200).json(questions);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  // Gets questions by card id
const getQuestionsByCard = asyncHandler(async (req, res) => {
  const qNew = req.query.new;
  const qCard = req.query.card;

  try {
    let questions

    if (qNew) {
      questions = await Question.find().populate("card").sort({ createdAt: -1 }).limit(1);
      
    } else if (qCard) {
      questions = await Question.find({
          card:
        { 
          $in: 
          [qCard]
        }}).populate("card")
    } else {
      questions = await Question.find().populate("card");
    }
    
    res.status(200).json(questions);
  } catch (err) {
    res.status(500).json(err);
  }
});

const updateQuestion = asyncHandler(async (req, res) => {
  Question.updateOne({ _id: req.params.id }, {
      $push: {
          options: req.body.options,
      }
  }).then(data => {
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
    getQuestionsByTest,
    getQuestionsByCard,
    updateQuestion
}
