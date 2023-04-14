const express = require('express')
const router = express.Router()
const { getQuestion, getQuestions, addQuestion, deleteQuestion, getQuestionsByTest } = require('../controllers/questionController')
const { isAdmin, protect } = require('../middleware/authMiddleware')

router.get('/all', protect, getQuestions)
router.get('/', protect, getQuestionsByTest)
router.post('/', protect, isAdmin, addQuestion)
router.get('/:id', protect, getQuestion)
router.delete('/:id', protect, isAdmin, deleteQuestion)

module.exports = router;
