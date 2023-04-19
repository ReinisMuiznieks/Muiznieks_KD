const express = require('express')
const router = express.Router()
const { addAnswer, getAnswer, getAnswers, deleteAnswer, getAnswersByQuestionId } = require('../controllers/answerController')
const { isAdmin, protect } = require('../middleware/authMiddleware')

router.get('/all', protect, getAnswers)
router.post('/', protect, isAdmin, addAnswer)
router.get('/:id', protect, getAnswer)
router.delete('/:id', protect, isAdmin, deleteAnswer)
router.get('/', protect, getAnswersByQuestionId)

module.exports = router;
