var http = require('http');
var fs = require('fs');

exports.upload = function (req, res, files) {


        if (files.imagem.name) {
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
                            return '1' //Erro ao mover a imagem!
                            //res.end('Erro ao mover a imagem!');
                        }
                        var msg = 'Imagem ' + image_upload_name + ' salva em: ' + image_upload_path_new;
                        console.log(msg);
                        return '2' //imagem salva com sucesso
                        //res.end(msg);
                    });
            }
            else {
                fs.mkdir(image_upload_path_new, function (err) {
                    if (err) {
                        console.log('Err: ', err);
                        return '3' //Erro ao criar o diretório
                        //res.end('Erro ao criar o diretório!');
                    }
                    fs.rename(
                        image_upload_path_old,
                        image_upload_path_name,
                        function (err) {
                            var msg = 'Imagem ' + image_upload_name + ' salva em: ' + image_upload_path_new;
                            console.log(msg);
                            return '4' //diretorio criado e imagem salva com sucesso
                            //res.end(msg);
                        });
                });
            }
        }

}

exports.remove = function (imagem) {

    var image_upload_path = './public/images/uploads/';

    if (fs.existsSync(image_upload_path + imagem)) {

        fs.unlink(image_upload_path + imagem, function (err) {
            if(err){
                console.log('Erro ao apagar a imagem: ' + imagem + ' do diretorio ' + image_upload_path);
                console.log('Erro : ' + err);
                return false;
            }

            console.log('A imagem: ' + imagem + ' foi pagada do diretorio ' + image_upload_path);

        })

    }else{
        console.log('A imagem: ' + imagem + 'nao existe no diretorio: ' + image_upload_path)
    }

}


