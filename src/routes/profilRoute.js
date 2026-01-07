const express = require('express')
const router =  express.Router()
const profilController = require('../controllers/profilController.js')

router.get('/:id',profilController.getProfilID)
router.post('/',profilController.createProfil)
router.put('/:id',profilController.updateProfil)

module.exports = router