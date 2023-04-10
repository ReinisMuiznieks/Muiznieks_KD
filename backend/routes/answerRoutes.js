const express = require('express')
const router = express.Router()
const { addAnswer, getAnswer, getAnswers, deleteAnswer } = require('../controllers/answerController')
const { isAdmin, protect } = require('../middleware/authMiddleware')

router.get('/', protect, getAnswers)
router.post('/', protect, isAdmin, addAnswer)
router.get('/:id', protect, getAnswer)
router.delete('/:id', protect, isAdmin, deleteAnswer)

module.exports = router;
