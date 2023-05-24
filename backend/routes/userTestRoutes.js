const express = require('express')
const router = express.Router()
const { addUserExam, getExam, getUserExams, getUserExamByTestId, deleteUserExam, editUserExam, patchUserExam, getUserExamByUserId, deleteAllUserExam } = require('../controllers/userTestController')
const { isAdmin, protect } = require('../middleware/authMiddleware')

router.get('/', protect, getUserExams)
router.get('/:id', protect, getExam)
router.get('/test/:id', protect, getUserExamByTestId)
router.get('/user/:id', protect, getUserExamByUserId)
router.post('/', protect, addUserExam)
router.put('/:id', protect,editUserExam)
router.patch('/:id', protect, patchUserExam)
router.delete('/:id', protect, isAdmin, deleteUserExam)
router.delete('/', protect, isAdmin, deleteAllUserExam)

module.exports = router;
