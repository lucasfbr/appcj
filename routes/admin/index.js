var express = require('express');
var router = express.Router();

var serviceConfig  = require('./../../servicos/config');
var serviceSociais  = require('./../../servicos/redesSociais');

var formidable = require('formidable');
var http       = require('http');
var fs         = require('fs');

var isAuthenticated = function (req, res, next) {
  // if user is authenticated in the session, call the next() to call the next request handler
  // Passport adds this method to request object. A middleware is allowed to add properties to
  // request and response objects
  if (req.isAuthenticated())
    return next();
  // if the user is not authenticated then redirect him to the login page
  res.redirect('/admin');
}

module.exports = function(passport){

  /* GET login page. */
  router.get('/', function(req, res) {
    // Display the Login page with any flash message, if any
    res.render('login', {
      message: req.flash('message')
    });
  });

  /* Handle Login POST */
  router.post('/', passport.authenticate('login', {
    successRedirect: '/admin/painel',
    failureRedirect: '/admin',
    failureFlash : true
  }));

  /* GET Registration Page */
  router.get('/signup', function(req, res){
    res.render('register',{
      message: req.flash('message'),
    });
  });

  /* Handle Registration POST */
  router.post('/signup', passport.authenticate('signup', {
    successRedirect: '/admin/painel',
    failureRedirect: '/admin/signup',
    failureFlash : true
  }));

  router.get('/painel', isAuthenticated, function(req, res){
    res.render('admin/painel', {
      user: req.user,
    });
  });

  /* Handle Logout */
  router.get('/signout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  router.get('/upload', function (req, res) {
    res.render('admin/upload');
  })

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






  router.get('/redesSociais', serviceSociais.findAll);

  router.post('/redesSociais', function (req, res) {

    var form = new formidable.IncomingForm();

    form.parse(req, function(err, fields, files) {

      var image = files.imagem
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



  router.get('/redesSociais/new', serviceSociais.new);

  router.put('/redesSociais/:id', serviceSociais.update);
  router.delete('/redesSociais/:id', serviceSociais.delete);
  router.get('/redesSociais/edit/:id', serviceSociais.edit);
  router.get('/config/edit/:id', serviceConfig.edit);


  router.put('/config/:id', serviceConfig.update);




  return router;
}