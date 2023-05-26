const asyncHandler = require('express-async-handler')
const router = require('express')
const UserExams = require('../models/userTestModel')

// get User Exams
const getUserExams = asyncHandler(async (req, res) => {
      UserExams.find().then(data => {
        res.json(data)
      }).catch(e => {
        res.json({ message: e })
      })
  })
  
  //specific exam
  const getExam = asyncHandler(async (req, res) => {
      try {
          UserExams.find({ _id: req.params.id }).then(data => {
            res.json(data)
          })
      } catch (err) {
        res.json({ message: err });
      }
  });
  
 // get User Exam by Test id
  const getUserExamByTestId = asyncHandler(async (req, res) => {
      try {
          UserExams.find({ test: req.params.id }).then(data => {
            res.json(data)
          })
      } catch (err) {
        res.json({ message: err });
      }
  });

 // get User Exam by User id
  const getUserExamByUserId = asyncHandler(async (req, res) => {
    try {
        UserExams.find({ user: req.params.id }).then(data => {
          res.json(data)
        })
    } catch (err) {
      res.json({ message: err });
    }
});
  
// add User Exam
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
  
  // update User Exam
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

   // patch User Exam
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
  
  // delete User Exam
  const deleteUserExam = asyncHandler(async (req, res) => {
      UserExams.deleteOne({ _id: req.params.id })
          .then(data => {
              res.json(data)
          }).catch(e => {
              res.json({ message: e })
          })
  })
  
  // delete all records of User Exams
  const deleteAllUserExam = async (req, res) => {
    try {
      await UserExams.deleteMany();
      res.json({ message: 'Deleted all records of User Exams' });
    } catch (error) {
      console.error(error);
      res.status(500);
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
