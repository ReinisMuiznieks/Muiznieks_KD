const express = require('express')
const router = express.Router()
const { addCategory, getCategory, updateCategory, deleteCategory } = require('../controllers/categoryController')
const { isAdmin, protect } = require('../middleware/authMiddleware')

router.get('/', protect, getCategory)
router.post('/', protect, isAdmin, addCategory)
router.delete('/:id', protect, isAdmin, deleteCategory)
router.put('/:id', protect, isAdmin, updateCategory)

module.exports = router;
