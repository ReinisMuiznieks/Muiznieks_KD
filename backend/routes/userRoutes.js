const express = require('express')
const router = express.Router()
const { registerUser, loginUser, getUser, getUsers, deleteUser, updateUser } = require('../controllers/userController')
const { isAdmin, protect } = require('../middleware/authMiddleware')

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/', getUsers)
router.get('/:id', getUser)
router.delete('/:id', deleteUser, protect, isAdmin)
router.put('/:id', protect, isAdmin, updateUser)

module.exports = router