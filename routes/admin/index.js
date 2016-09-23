var express = require('express');
var router = express.Router();

var serviceConfig  = require('./../../servicos/config');
var serviceSociais  = require('./../../servicos/redesSociais');

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


  router.get('/redesSociais', serviceSociais.findAll);
  router.post('/redesSociais', serviceSociais.create);
  router.get('/redesSociais/new', serviceSociais.new);
  router.post('/redesSociais/update/:id', serviceSociais.update);
  router.delete('/redesSociais/:id', serviceSociais.delete);
  router.get('/redesSociais/edit/:id', serviceSociais.edit);

  router.get('/config/edit/:id', serviceConfig.edit);
  router.post('/config/update/:id', serviceConfig.update);




  return router;
}