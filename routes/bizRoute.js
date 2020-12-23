var express = require('express');
var router = express.Router();
var bizController = require('../controllers/bizCtrl')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login', bizController.authenticate);
router.post('/register', bizController.create);


module.exports = router;
