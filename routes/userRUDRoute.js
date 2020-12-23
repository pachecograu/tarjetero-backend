var express = require('express');
var router = express.Router();
var userRUDController = require('../controllers/userRUDCtrl')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/findAll', userRUDController.findAll);
router.get('/findById', userRUDController.findById);
router.post('/updateById', userRUDController.updateById);
router.post('/deleteById', userRUDController.deleteById);


module.exports = router;
