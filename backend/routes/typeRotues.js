const express = require('express')
const router = express.Router()
const { addType, getType } = require('../controllers/typeController')
const { isAdmin, protect } = require('../middleware/authMiddleware')

router.post('/', protect, isAdmin, addType)
router.get('/', protect, getType)

module.exports = router;
