var express = require('express');
var router = express.Router();



module.exports = function(){

    router.get('/', function(req, res, next) {

        res.io.emit("socketToMe", "usuario conectado ao chat!!!");

        res.render('admin/chat', { title: 'Chat' });
    });

    return router;
}