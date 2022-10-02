var express = require('express');
var router = express.Router();
const productController = require('../controllers/productController');
const multer = require('multer');
const path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Le Marche Server' });
});
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join('./public/images'))
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

const upload = multer({storage: storage});
router.post('/create', upload.array('fieldname', 3), productController.create);
router.get('/products', productController.list); 
router.post('/edit', upload.array('fieldname', 3), productController.edit);
router.post('/edit/selected', productController.selected);
router.post('/delete', productController.delete);
router.post('/create-category', upload.single('img_path'), productController.createCategory);
router.post('/update-category', upload.single('img_path'), productController.updateCategory);
router.post('/delete-category', productController.deleteCategory);
router.get('/category', productController.listCategory);
router.get('/product/:id', productController.onlyProduct);
router.get('/search', productController.search);
router.post('/demo-form', upload.array('fieldname', 5), productController.demo);
router.post('/detail-category', productController.detail);

module.exports = router;
