const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');
const multer = require('multer');
let path = require('path');

const storage = multer.memoryStorage()
const upload = multer({storage: storage});

router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname+'/index.html'));
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
router.post('/delete-equipo', mainController.deleteEquipo)
router.post('/voluntario', upload.single('image'), mainController.addVoluntario)
router.get('/voluntario', mainController.getVoluntario)
router.post('/delete-voluntario', mainController.deleteVoluntario)
router.post('/editar-voluntario', upload.single('image'), mainController.editVoluntario)

module.exports = router;