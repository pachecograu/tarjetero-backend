var express = require('express');
var router = express.Router();
var userController = require('../controllers/userCtrl')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login', userController.authenticate);
router.post('/register', userController.create);


module.exports = router;
