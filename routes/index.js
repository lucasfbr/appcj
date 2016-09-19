var express = require('express');
var router = express.Router();
var service  = require('./../servicos/index');

var formidable = require('formidable');
var http       = require('http');
var fs         = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/upload', function (req, res) {

  var form = new formidable.IncomingForm();

  form.parse(req, function(err, fields, files) {

    var image = files.image
        , image_upload_path_old = image.path
        , image_upload_path_new = './public/images/uploads/'
        , image_upload_name = image.name
        , image_upload_path_name = image_upload_path_new + image_upload_name
        ;

    if (fs.existsSync(image_upload_path_new)) {
      fs.rename(
          image_upload_path_old,
          image_upload_path_name,
          function (err) {
            if (err) {
              console.log('Err: ', err);
              res.end('Erro ao mover a imagem!');
            }
            var msg = 'Imagem ' + image_upload_name + ' salva em: ' + image_upload_path_new;
            console.log(msg);
            res.end(msg);
          });
    }
    else {
      fs.mkdir(image_upload_path_new, function (err) {
        if (err) {
          console.log('Err: ', err);
          res.end('Erro ao criar o diretório!');
        }
        fs.rename(
            image_upload_path_old,
            image_upload_path_name,
            function(err) {
              var msg = 'Imagem ' + image_upload_name + ' salva em: ' + image_upload_path_new;
              console.log(msg);
              res.end(msg);
            });
      });
    }
  });

});

router.post('/sendMail', service.send);



module.exports = router;
