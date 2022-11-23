const express = require('express')
const router = express.Router()
const {
    addCard,
    getCard,
    updateCard,
    deleteCard,
    getCardbyId,
    getCardsbyCategory,
} = require('../controllers/cardController')
const { isAdmin, protect } = require('../middleware/authMiddleware')

router.post('/', protect, isAdmin, addCard)
router.get('/all', protect, getCard)
router.get('/:id', protect, getCardbyId)
router.put('/:id', protect, isAdmin, updateCard)
router.delete('/:id', protect, isAdmin, deleteCard)
router.get('/', getCardsbyCategory)

module.exports = router;
