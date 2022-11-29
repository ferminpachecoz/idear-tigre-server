const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js')

router.post('/', userController.find)
router.post('/create', userController.create)
module.exports = router;