var express = require('express');
var multer = require('multer');
var router = express.Router();
var bizRUDController = require('../controllers/bizRUDCtrl')
var upload = multer({
  dest: 'public/photo'
});

/* GET bizs listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/findAll', bizRUDController.findAll);
router.get('/findById', bizRUDController.findById);
router.post('/updateById', upload.any(), bizRUDController.updateById);
router.post('/deleteById', bizRUDController.deleteById);


module.exports = router;
