var express = require('express');
var router = express.Router();
var commentController = require('../controllers/commentCtrl');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/create', commentController.create);
router.get('/findbybarber', commentController.findByBarber);


module.exports = router;
