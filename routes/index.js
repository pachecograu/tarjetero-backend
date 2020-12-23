var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/photo/:fileName', function (req, res) {
  res.sendFile('/public/photo/' + req.params.fileName);
});

module.exports = router;
