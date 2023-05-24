const asyncHandler = require('express-async-handler')
const router = require('express')
const UserExams = require('../models/userTestModel')

const getUserExams = asyncHandler(async (req, res) => {
      UserExams.find().then(data => {
        res.json(data)
      }).catch(e => {
        res.json({ message: e })
      })
  })
  
  //spesific exam
  const getExam = asyncHandler(async (req, res) => {
      try {
          UserExams.find({ _id: req.params.id }).then(data => {
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
      completed: req.body.completed,
      incorrectAnswers: req.body.incorrectAnswers,
    });
  
    // Validate the UserExam instance
    const validationError = userExams.validateSync();
    if (validationError) {
      console.log(validationError);
      res.status(400).json({ error: validationError });
      return;
    }
  
    // Save the UserExam instance
    userExams.save()
      .then((data) => {
        res.json(data);
      })
      .catch((e) => {
        res.json({ message: e });
      });
  });
  
//   const addUserExams= asyncHandler(async (req, res) => {
//     try {
//       const { test, user, score, completed, incorrectAnswers } = req.body;
//       const userExam = new UserExam({
//         test,
//         user,
//         score,
//         completed,
//         incorrectAnswers,
//       });
//       const savedUserExam = await userExam.save();
//       res.json(savedUserExam);
//     } catch (error) {
//       res.status(500).json({ message: 'Failed to add user exam.' });
//     }
//   });
  
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
  
  const deleteAllUserExam = async (req, res) => {
    try {
      await UserExams.deleteMany();
      res.json({ message: 'UserExam records deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to delete userexam records' });
    }
  };

  module.exports = router;

module.exports = {
    deleteAllUserExam,
    getExam,
    getUserExams,
    getUserExamByTestId,
    addUserExam,
    deleteUserExam,
    patchUserExam,
    editUserExam,
    getUserExamByUserId,
}