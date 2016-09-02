var nodemailer = require('nodemailer');

var conta = nodemailer.createTransport('smtps://lucasfbr03@gmail.com:info03_lucas01@smtp.gmail.com');

exports.send = function (req, res) {

    var objeto = {};

    if(req.body) {

        conta.sendMail({
            from: '<'+req.body.email+'>', // Quem está mandando
            to: '<lucasfbr03@gmail.com>', // Para quem o e-mail deve chegar
            subject: 'Contato pelo site' , // O assunto
            html:
            '<strong>Nome:</strong>' + req.body.nome + '<br />' +
            '<strong>E-mail:</strong>' + req.body.email + '<br />' +
            '<strong>Telefone:</strong>' + req.body.telefone + '<br />' +
            '<p>'+req.body.mensagem+'</p>', // O HTMl do nosso e-mail
        }, function (err) {
            if (err) {

                objeto = {
                    msgMail: 'Erro ao enviar o email, tente novamente mais tarde!',
                    alert: 'msg'
                };

                console.log('Erro ao enviar o e-mail: '+ err);

            }else {

                objeto = {
                    msgMail: 'Email enviado com sucesso, logo entraremos em contato!',
                    alert: 'msg'
                };
            }

            res.render('index', objeto);

        });

    }



}