var nodemailer = require('nodemailer');


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



}


/*
exports.send = function (req, res) {

    /*var sendgrid = require("sendgrid")("TfnrVeTCTHaKEzg6kMUI5g");
    var email = new sendgrid.Email();

    email.addTo("lucas-fbr@hotmail.com");
    email.setFrom("lucasfbr03@gmail.com");
    email.setSubject("Sending with SendGrid is Fun");
    email.setHtml("and easy to do anywhere, even with Node.js");

    sendgrid.send(email);*/

   /* var helper = require('sendgrid').mail

    from_email = new helper.Email("lucasfbr03@gmail.com")
    to_email = new helper.Email("lucas-fbr@hotmail.com")
    subject = "Sending with SendGrid is Fun"
    content = new helper.Content("text/plain", "and easy to do anywhere, even with Node.js")
    mail = new helper.Mail(from_email, subject, to_email, content)

    var sg = require('sendgrid')("TfnrVeTCTHaKEzg6kMUI5g");
    var request = sg.emptyRequest({
        method: 'POST',
        path: '/v3/mail/send',
        body: mail.toJSON()
    });

    sg.API(request, function(error, response) {
        console.log(response.statusCode)
        console.log(response.body)
        console.log(response.headers)
    })

    res.render('index');


}*/
