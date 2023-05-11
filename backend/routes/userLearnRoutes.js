const express = require('express')
const router = express.Router()
const { addUserLearn, getLearn, getUserLearn, getUserLearnByCategoryId, deleteUserLearn, editUserLearn, patchUserLearn, getUserLearnByUserId, getUserLearnByUserAndCategoryId,deleteAllUserLearn} = require('../controllers/userLearnController')
const { isAdmin, protect } = require('../middleware/authMiddleware')

router.get('/all', protect, getUserLearn)
router.get('/:id', protect, getLearn)
router.get('/category/:id', protect, getUserLearnByCategoryId)
router.get('/user/:id', protect, getUserLearnByUserId)
router.post('/', protect, addUserLearn)
router.put('/:id', protect,editUserLearn)
router.patch('/:id', protect, patchUserLearn)
router.delete('/:id', protect, isAdmin, deleteUserLearn)
router.get('/', protect, getUserLearnByUserAndCategoryId);
router.delete('/', protect, isAdmin, deleteAllUserLearn);

module.exports = router;
