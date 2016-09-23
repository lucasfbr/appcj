var express = require('express');
var router = express.Router();
var service  = require('./../servicos/emails');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/sendMail', service.send);

module.exports = router;
