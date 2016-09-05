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

    var objeto = {};

    var helper = require('sendgrid').mail;
    var from_email = new helper.Email('test@example.com');
    var to_email = new helper.Email('lucasfbr03@gmail');
    var subject = 'Hello World from the SendGrid Node.js Library!';
    var content = new helper.Content('text/plain', 'Hello, Email!');
    var mail = new helper.Mail(from_email, subject, to_email, content);

    var sg = require('sendgrid')('TfnrVeTCTHaKEzg6kMUI5g');
    var request = sg.emptyRequest({
        method: 'POST',
        path: '/v3/mail/send',
        body: mail.toJSON(),
    });

    sg.API(request, function(error, response) {

        if (error) {

            objeto = {
                msgMail: 'Erro ao enviar o email, tente novamente mais tarde!',
                alert: 'msg'
            };

            console.log('Erro ao enviar o e-mail: '+ error);

        }else {

            objeto = {
                msgMail: 'Email enviado com sucesso, logo entraremos em contato!',
                alert: 'msg'
            };
        }


        console.log(response.statusCode);
        console.log(response.body);
        console.log(response.headers);


        res.render('index', objeto);
    });


}
