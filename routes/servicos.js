var express = require('express');
var router  = express.Router();
var db = require('../models');


router.get('/', function(req, res, next) {
  res.render('servicos', {});
});

router.get('/chat', function (req, res) {

    res.render('clienteChat', {
        msg: "Nenhum usuário informado para este chat, marque um horário em nossa agenda e siga as instruções enviadas por e-mail",
        status: false
    });

})

router.get('/chat/:id', function(req, res, next) {

      db.Users
          .findOne({
              where: {
                  id: req.params.id,
                  statusChat: 1
              }
          })
          .then(function (result) {

              if (result) {
                  res.render('clienteChat', {nickname: result.nickname, status: true});
                  //console.log('dados : ' + result[0].firstname)
              } else {
                  res.render('clienteChat', {
                      msg: "Usuario sem acesso ao chat, tente novamente mais tarde ou entre em contato com administrador!",
                      status: false
                  });
              }


          })
          .catch(function (err) {
              console.log('Erro ao consultar a Users => ' + err);

          })

});

module.exports = router;
