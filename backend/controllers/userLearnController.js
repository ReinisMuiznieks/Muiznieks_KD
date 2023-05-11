const asyncHandler = require('express-async-handler')
const router = require('express')
const UserLearn = require('../models/userLearnModel')

const getUserLearn = asyncHandler(async (req, res) => {
    UserLearn.find().then(data => {
        res.json(data)
      }).catch(e => {
        res.json({ message: e })
      })
  })
  
  //spesific exam
  const getLearn = asyncHandler(async (req, res) => {
      try {
        UserLearn.find({ _id: req.params.id }).then(data => {
            res.json(data)
          })
      } catch (err) {
        res.json({ message: err });
      }
  });
  
  const getUserLearnByCategoryId = asyncHandler(async (req, res) => {
      try {
            UserLearn.find({ category: req.params.id }).then(data => {
            res.json(data)
          })
      } catch (err) {
        res.json({ message: err });
      }
  });

  const getUserLearnByUserId = asyncHandler(async (req, res) => {
    try {
        UserLearn.find({ user: req.params.id }).then(data => {
          res.json(data)
        })
    } catch (err) {
      res.json({ message: err });
    }
});
  
const addUserLearn = asyncHandler(async (req, res) => {
  const newUserLearn = new UserLearn({
    category: req.body.category,
    user: req.body.user,
    progress: req.body.progress,
    completed: req.body.completed,
  });

  const validationError = newUserLearn.validateSync();
  if (validationError) {
    console.log(validationError);
    res.status(400).json({ error: validationError });
    return;
  }

  newUserLearn.save()
    .then((data) => {
      res.json(data);
    })
    .catch((e) => {
      res.json({ message: e });
    });
});

  
  
  const editUserLearn = asyncHandler(async (req, res) => {
        UserLearn.updateOne({ _id: req.params.id }, {
          $push: {
              completed: req.body.completed,
              progress: req.body.progress,
          }
      }).then(data => {
          res.json(data)
      }).catch(e => {
          res.json({ message: e })
      })
  })
  
  const patchUserLearn = asyncHandler(async (req, res) => {
    UserLearn.updateOne({ _id: req.params.id }, {
          $set: {
              category: req.body.category,
              user: req.body.user,
              completed: req.body.completed,
              progress: req.body.progress,
          }
      }).then(data => {
          res.json(data)
      }).catch(e => {
          res.json({ message: e })
      })
  })
  
  const deleteUserLearn = asyncHandler(async (req, res) => {
      UserLearn.deleteOne({ _id: req.params.id })
          .then(data => {
              res.json(data)
          }).catch(e => {
              res.json({ message: e })
          })
  })
  
  module.exports = router;

module.exports = {
    getLearn,
    getUserLearn,
    getUserLearnByCategoryId,
    addUserLearn,
    deleteUserLearn,
    patchUserLearn,
    editUserLearn,
    getUserLearnByUserId,
}
