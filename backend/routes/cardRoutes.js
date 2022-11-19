const express = require('express')
const router = express.Router()
const {
    addCard,
    getCard,
    updateCard,
    deleteCard, 
} = require('../controllers/cardController')
const { isAdmin, protect } = require('../middleware/authMiddleware')

router.post('/', protect, isAdmin, addCard)
router.get('/', protect, getCard)
router.get('/:id', getCard)
router.put('/:id', protect, isAdmin, updateCard)
router.delete('/:id', protect, isAdmin, deleteCard)

module.exports = router;
