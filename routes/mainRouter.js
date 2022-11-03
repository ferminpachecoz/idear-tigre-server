const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');

router.get('/actividades', mainController.list);
router.post('/actividades', mainController.create);
router.post('/edit-actividad', mainController.edit)
router.post('/delete-actividad', mainController.delete)
module.exports = router;