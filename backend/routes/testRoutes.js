const express = require('express')
const router = express.Router()
const { getTest, getTests, addTest, deleteTest } = require('../controllers/testController')
const { isAdmin, protect } = require('../middleware/authMiddleware')

router.get('/', protect, getTests)
router.post('/', protect, isAdmin, addTest)
router.get('/:id', protect, getTest)
router.delete('/:id', protect, isAdmin, deleteTest)

module.exports = router;
