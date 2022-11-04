const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');
const multer = require('multer');

const storage = multer.memoryStorage()
const upload = multer({storage: storage});

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Idear Server' });
});
router.get('/actividades', mainController.list);
router.post('/actividades', mainController.create);
router.post('/edit-actividad', mainController.edit)
router.post('/delete-actividad', mainController.delete)
router.post('/agregar-imagen', upload.single('file'), mainController.addImage)
router.get('/images', mainController.getImages)
router.post('/delete-image', mainController.deleteImage)
router.post('/equipo', upload.single('file'), mainController.addEquipo)
router.get('/equipo', mainController.getEquipo)

module.exports = router;