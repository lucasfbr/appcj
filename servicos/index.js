//var nodemailer = require('nodemailer');

/*
exports.send = function (req, res) {

    var conta = nodemailer.createTransport('smtps://lucasfbr03@gmail.com:info03_lucas01@smtp.gmail.com');

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



}*/



exports.send = function (req, res) {


    var smtpapi = require('../lib/main.js')
    var nodemailer = require('nodemailer');
    var header = new smtpapi();

    // Send usin Nodemailer
    var headers    = { 'x-smtpapi': header.jsonString() };

// Use nodemailer to send the email
    var settings  = {
        host: "smtp.sendgrid.net",
        port: parseInt(587, 10),
        requiresAuth: true,
        auth: {
            user: 'app55826511@heroku.com',
            pass: 'u7y02inx6736'
        }
    };

    var smtpTransport = nodemailer.createTransport(settings);

    var mailOptions = {
        from:     "Example User <test@examplecom>",
        to:       "lucasfbr03@gmail.com",
        subject:  "Hello",
        text:     "Hello world",
        html:     "<b>Hello world</b>",
        headers:  headers
    }

    smtpTransport.sendMail(mailOptions, function(error, response) {
        smtpTransport.close();

        if (error) {
            objeto = {
                //msgMail: 'Erro ao enviar o email, tente novamente mais tarde!',
                msgMail: error,
                alert: 'msg'
            };

            console.log('Erro ao enviar o e-mail: '+ error);

        }else {

            objeto = {
                msgMail: 'Email enviado com sucesso, logo entraremos em contato! ',
                alert: 'msg'
            };
        }

        res.render('index', objeto);
    });


}
