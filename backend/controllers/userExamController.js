const asyncHandler = require('express-async-handler')
const router = require('express')
const UserExams = require('../models/userExamModel')

const getUserExams = asyncHandler(async (req, res) => {
      UserExams.find().then(data => {
        res.json(data)
      }).catch(e => {
        res.json({ message: e })
      })
  })
  
  //spesific exam
  const getUserExam = asyncHandler(async (req, res) => {
      try {
          UserExams.find({ user: req.params.id }).then(data => {
            res.json(data)
          })
      } catch (err) {
        res.json({ message: err });
      }
  });
  
  const getUserExamByTestId = asyncHandler(async (req, res) => {
      try {
          UserExams.find({ test: req.params.id }).then(data => {
            res.json(data)
          })
      } catch (err) {
        res.json({ message: err });
      }
  });

  const getUserExamByUserId = asyncHandler(async (req, res) => {
    try {
        UserExams.find({ user: req.params.id }).then(data => {
          res.json(data)
        })
    } catch (err) {
      res.json({ message: err });
    }
});
  
  
  const addUserExam = asyncHandler(async (req, res) => {
      const userExams = new UserExams({
          test: req.body.test,
          user: req.body.user,
          score: req.body.score,
          completed: req.body.completed
      })
      userExams.save().then(data => {
          res.json(data)
      }).catch(e => {
          res.json({ message: e })
      })
  })
  
  const editUserExam = asyncHandler(async (req, res) => {
      UserExams.updateOne({ _id: req.params.id }, {
          $push: {
              completed: req.body.completed,
              score: req.body.score,
          }
      }).then(data => {
          res.json(data)
      }).catch(e => {
          res.json({ message: e })
      })
  })
  
  const patchUserExam = asyncHandler(async (req, res) => {
      UserExams.updateOne({ _id: req.params.id }, {
          $set: {
              test: req.body.test,
              user: req.body.user,
              completed: req.body.completed,
          }
      }).then(data => {
          res.json(data)
      }).catch(e => {
          res.json({ message: e })
      })
  })
  
  const deleteUserExam = asyncHandler(async (req, res) => {
      UserExams.deleteOne({ _id: req.params.id })
          .then(data => {
              res.json(data)
          }).catch(e => {
              res.json({ message: e })
          })
  })
  
  module.exports = router;

module.exports = {
    getUserExam,
    getUserExams,
    getUserExamByTestId,
    addUserExam,
    deleteUserExam,
    patchUserExam,
    editUserExam,
    getUserExamByUserId,
}
