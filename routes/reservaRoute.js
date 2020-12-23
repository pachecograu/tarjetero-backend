var express = require('express');
var router = express.Router();
var reservaController = require('../controllers/reservaCtrl')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/create', reservaController.create);
router.get('/findbybarber', reservaController.findByBarber);
router.get('/findbyuser', reservaController.findByUser);


module.exports = router;
