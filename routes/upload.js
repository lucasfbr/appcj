var express = require('express');
var router = express.Router();
var formidable = require('formidable');
var http       = require('http');
var fs         = require('fs');

var service  = require('./../servicos/index');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('upload', { title: 'Express' });
});

router.post('/upload', function (req, res) {

    res.send('asddasdasdasd');

});



module.exports = router;
