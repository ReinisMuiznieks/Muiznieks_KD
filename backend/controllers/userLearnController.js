const asyncHandler = require('express-async-handler')
const router = require('express')
const UserLearn = require('../models/userLearnModel')

// get UserLearn
const getUserLearn = asyncHandler(async (req, res) => {
    UserLearn.find().then(data => {
        res.json(data)
      }).catch(e => {
        res.json({ message: e })
      })
  })
  
//specific exam
  const getLearn = asyncHandler(async (req, res) => {
      try {
        UserLearn.find({ _id: req.params.id }).then(data => {
            res.json(data)
          })
      } catch (err) {
        res.json({ message: err });
      }
  });
  
// get User Learn by Category id
  const getUserLearnByCategoryId = asyncHandler(async (req, res) => {
      try {
            UserLearn.find({ category: req.params.id }).then(data => {
            res.json(data)
          })
      } catch (err) {
        res.json({ message: err });
      }
  });
// get User Learn by User id
  const getUserLearnByUserId = asyncHandler(async (req, res) => {
    try {
        UserLearn.find({ user: req.params.id }).then(data => {
          res.json(data)
        })
    } catch (err) {
      res.json({ message: err });
    }
});

// add User Learn
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

  
// update User Learn
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


// patch User Learn
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
  
// delete User Learn
  const deleteUserLearn = asyncHandler(async (req, res) => {
      UserLearn.deleteOne({ _id: req.params.id })
          .then(data => {
              res.json(data)
          }).catch(e => {
              res.json({ message: e })
          })
  })
  
// get User Learn by User and Category Id
  const getUserLearnByUserAndCategoryId = async (req, res) => {
    const { user, category } = req.query;
    try {
      const userLearn = await UserLearn.find({ user: user, category: category });
      res.json(userLearn);
    } catch (error) {
      console.error(error);
      res.status(500).json;
    }
  };

  // delete all records of User learn
  const deleteAllUserLearn = async (req, res) => {
    try {
      await UserLearn.deleteMany();
      res.json({ message: 'Deleted all of User Learn records' });
    } catch (error) {
      console.error(error);
      res.status(500);
    }
  };

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
    getUserLearnByUserAndCategoryId,
    deleteAllUserLearn
}
