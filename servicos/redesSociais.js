var db = require('../models');

exports.findAll = function (req, res) {

    db.RedesSociais
        .findAll()
        .then(function (result) {
            res.render('admin/redesSociais', {
                redesSociais: result
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


    var form = new formidable.IncomingForm();

    form.parse(req, function(err, fields, files) {

        var image = files.image
            , image_upload_path_old = image.path
            , image_upload_path_new = './public/images/uploads'
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


/*
    db.RedesSociais
        .update(req.body, { where : { id : req.params.id } })
        .then(function (result) {
            res.redirect('/admin/redesSociais');

        })
        .catch(function (err) {
            console.log('Erro ao consultar a tabela Redes Sociais => ' + err);

        })*/
}

exports.new = function (req, res) {
    res.render('admin/redesSociais_cadastro');
}

exports.create = function (req, res) {

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



    db.RedesSociais
        .create(req.body)
        .then(function (result) {
            res.redirect('/admin/redesSociais');
        })
        .catch(function (err) {
            console.log('Erro ao inserir dados na tabela Redes Sociais => ' + err);

        })
}

exports.delete = function (req, res) {

    db.RedesSociais
        .destroy({ where : { id : req.params.id } })
        .then(function (result) {
            res.redirect('/admin/redesSociais');

        })
        .catch(function (err) {
            console.log('Erro ao inserir dados na tabela Redes Sociais => ' + err);

        })
}