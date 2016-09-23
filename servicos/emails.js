exports.send = function (req, res) {


    var smtpapi = require('smtpapi/lib/main.js')
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
        from:     req.body.nome+"<"+req.body.email+">",
        to:       "lucas-fbr@hotmail.com",
        subject:  "Contato feito pelo site matheuspaludo.com.br",
        html:     "<b>Nome:</b> "+req.body.nome+"<b><br><br><b>Telefone de Contato:</b> "+req.body.telefone+"<b><br><br>"+req.body.mensagem+"</b>" ,
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
