const express = require('express')
const router = express.Router()
const { addCategory, getCategory } = require('../controllers/categoryController')
const { isAdmin, protect } = require('../middleware/authMiddleware')

router.post('/', protect, isAdmin, addCategory)
router.get('/', protect, getCategory)

module.exports = router;
