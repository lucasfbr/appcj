var db = require('../models');
var formidable = require('formidable');
var imagens = require('../servicos/imagens');


exports.findAll = function (req, res) {

    db.RedesSociais
        .findAll()
        .then(function (result) {
            res.render('admin/redesSociais', {
                redesSociais: result,
                sucesso: req.flash('sucesso'),
                erro: req.flash('erro')
            });

        })
        .catch(function (err) {
            console.log('Erro ao consultar a tabela Redes Sociais => ' + err);

        })
}

exports.edit = function (req, res) {

    db.RedesSociais
        .findById(req.params.id)
        .then(function (result) {
            res.render('admin/redesSociais_update', {
                dados: result
            });

        })
        .catch(function (err) {
            console.log('Erro ao consultar a tabela Redes Sociais => ' + err);

        })
}

exports.update = function (req, res) {

    var img_old;
    var resultUpload;
    var form = new formidable.IncomingForm();

    form.parse(req, function (err, fields, files) {


        db.RedesSociais
            .findById(req.params.id)
            .then(function (result) {
                console.log('imagem que deve ser removida do banco e da pasta : ' + result.imagem);

                //service responsavel por fazer a remoção da imagem antiga do diretorio, caso exista
                imagens.remove(result.imagem);

                return db.RedesSociais.update({
                    nome: fields.nome,
                    link: fields.link,
                    imagem: files.imagem.name
                }, {
                    where: {id: req.params.id}
                })

            })
            .then(function () {
                //upload: funcao responsavel por fazer upload de imagens
                //para um correto funcionamento deve ser enviado o "req" e o "res"
                resultUpload = imagens.upload(req, res, files);

                req.flash('sucesso', 'Dados alterados cum sucesso!');
                res.redirect('/admin/redesSociais');

            })
            .catch(function (err) {
                console.log('Erro ao atualizar base de dados');
                console.log('Erro => ' + err);

                req.flash('erro', 'Erro ao alterar os dados, tente novamente mais tarde!');
                res.redirect('/admin/redesSociais');
            })

    })
}

exports.new = function (req, res) {
    res.render('admin/redesSociais_cadastro');
}

exports.create = function (req, res) {

    var resultUpload;
    var form = new formidable.IncomingForm();

    form.parse(req, function (err, fields, files) {

        //upload: funcao responsavel por fazer upload de imagens
        //para um correto funcionamento deve ser enviado o "req" e o "res"
        resultUpload = imagens.upload(req, res, files);

        db.RedesSociais
            .create({
                nome: fields.nome,
                link: fields.link,
                imagem: files.imagem.name
            })
            .then(function (result) {
                req.flash('sucesso', 'Dados criados cum sucesso!');
                res.redirect('/admin/redesSociais');
            })
            .catch(function (err) {

                console.log('Erro ao inserir dados na tabela Redes Sociais => ' + err);
                req.flash('erro', 'Erro ao criar os dados, tente novamente mais tarde!');
                res.redirect('/admin/redesSociais');

            })
    })
}

exports.delete = function (req, res) {


    db.RedesSociais
        .findById(req.params.id)
        .then(function (result) {
            console.log('imagem que deve ser removida do banco e da pasta : ' + result.imagem);

            //service responsavel por fazer a remoção da imagem antiga do diretorio, caso exista
            imagens.remove(result.imagem);

            return db.RedesSociais.destroy({where: {id: req.params.id}})

        })
        .then(function (result) {
            req.flash('sucesso', 'Dados removidos cum sucesso!');
            res.redirect('/admin/redesSociais');

        })
        .catch(function (err) {
            console.log('Erro ao inserir dados na tabela Redes Sociais => ' + err);
            req.flash('erro', 'Erro ao remover os dados, tente novamente mais tarde!');
            res.redirect('/admin/redesSociais');

        })

}

