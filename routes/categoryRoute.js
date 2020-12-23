var express = require('express');
var router = express.Router();
var categoryController = require('../controllers/categoryCtrl')

/* GET category listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/create', categoryController.create);
router.get('/findAll', categoryController.findAll);
router.get('/findById', categoryController.findById);
router.post('/updateById', categoryController.updateById);
router.post('/deleteById', categoryController.deleteById);


module.exports = router;
