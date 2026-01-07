const express = require('express')
const router = express.Router()
const controller = require('../controllers/userController.js')

router.get('/',controller.getUser)
router.post('/',controller.createusers)

module.exports = router