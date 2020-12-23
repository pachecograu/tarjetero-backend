var express = require('express');
var router = express.Router();
var serviceController = require('../controllers/serviceCtrl')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/create', serviceController.create);
router.get('/findall', serviceController.findAll);


module.exports = router;
