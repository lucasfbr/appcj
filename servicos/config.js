var db = require('../models');
var fs = require('fs');
var im = require('imagemagick');
var path = require('path');

exports.edit = function (req, res) {

    db.ConfigBasicas
        .findById(req.params.id)
        .then(function (result) {
            res.render('admin/config', {
                dados: result
            });

        })
        .catch(function (err) {
            console.log('Erro ao consultar a tabela ConfigBasicas => ' + err);

        })
}

exports.update = function (req, res) {

    /*INICIO UPLOAD DE IMAGEM*/
    //if (req.files) {

        console.log('path -> '+req.files.logotipo.path); //form fields

        console.log('File -> '+req.files.logotipo.name); //form files

        console.log('endereco -> '+ "./public/images/uploads/fullsize/");

        var imagem;

        imagem = req.files.sampleFile;

        imagem.mv('./images/uploads/', function(err) {
            if (err) {
                res.status(500).send(err);
                console.log('Erro ao fazer upload de imagem: ' + err);
            }
            else {
                console.log('File uploaded!');
                res.redirect('/admin/config/edit/1');
            }
        });



    //}
    /*FIM UPLOAD DE IMAGEM*/

    /*db.ConfigBasicas
        .update(req.body, { where : { id : req.params.id } })
        .then(function (result) {
            res.redirect('/admin/config/edit/1');

        })
        .catch(function (err) {
            console.log('Erro ao consultar a tabela ConfigBasicas => ' + err);

        })*/


}
