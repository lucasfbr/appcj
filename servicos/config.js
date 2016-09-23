var db = require('../models');
var formidable = require('formidable');
var imagens = require('../servicos/imagens');


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

    var img_old;
    var resultUpload;
    var form = new formidable.IncomingForm();

    form.parse(req, function (err, fields, files) {

        db.ConfigBasicas
            .findById(req.params.id)
            .then(function (result) {
                console.log('imagem que deve ser removida do banco e da pasta : ' + result.imagem);

                //service responsavel por fazer a remoção da imagem antiga do diretorio, caso exista
                //imagens.remove(result.imagem);

                return db.ConfigBasicas.update({
                    nomeEmpresa     : fields.nomeEmpresa,
                    email           : fields.email,
                    estado          : fields.estado,
                    cidade          : fields.cidade,
                    bairro          : fields.bairro,
                    endereco        : fields.endereco,
                    numero          : fields.numero,
                    telefone        : fields.telefone,
                    endGoogleMaps   : fields.endGoogleMaps,
                    emailContato    : fields.email,
                    usuarioPagseguro: fields.usuarioPagseguro,
                    senhaPagseguro  : fields.senhaPagseguro,
                    keyPagseguro    : fields.keyPagseguro
                }, {
                    where: {id: req.params.id}
                })

            })
            .then(function () {
                //upload: funcao responsavel por fazer upload de imagens
                //para um correto funcionamento deve ser enviado o "req" e o "res"
                //resultUpload = imagens.upload(req, res, files);

                res.redirect('/admin/config/edit/1');

            })
            .catch(function (err) {
                console.log('Erro ao atualizar base de dados');
                console.log('Erro => ' + err);
            })

    })
}
