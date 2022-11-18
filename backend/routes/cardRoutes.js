const express = require('express')
const router = express.Router()
const { createCard, getCard } = require('../controllers/cardController')
const { isAdmin, protect } = require('../middleware/authMiddleware')

router.post('/', protect, isAdmin, createCard)
router.get('/', getCard)

module.exports = router;
