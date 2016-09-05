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

    //var smtpapi = require('../lib/main.js')
    var smtpapi = require('smtpapi/lib/main.js')
    var nodemailer = require('nodemailer');
    var header    = new smtpapi();

// addTo
    header.addTo('test1@example.com');
    header.addTo('test2@example.com');

// setTos
//header.setTos(['you@youremail.com', 'other@otheremail.com');

// addSubstitution
    header.addSubstitution('keep', ['secret']);
    header.addSubstitution('other', ['one', 'two']);

// setSubstitutions
//header.setSubstitutions({'keep': ['secret'], 'other': ['one', 'two']});

// addUniqueArg
    header.addUniqueArg('cat', 'dogs');

// setUniqueArgs
//header.setUniqueArgs({cow: 'chicken'});
//header.setUniqueArgs({dad: 'proud'});

// addCategory
    header.addCategory('tactics');
    header.addCategory('advanced');

// setCategories
//header.setCategories(['tactics', 'advanced']);

// addSection
    header.addSection('-charge-', 'This ship is useless.');

// setSections
//header.setSections({'-charge-': 'This ship is useless.', '-other': 'Another section here'});

// addFilter
// You can add filter settings one at a time.
    header.addFilter('footer', 'enable', 1);
    header.addFilter('footer', 'text/html', '<strong>boo</strong>');

// setFilters
// You can set a filter using an object literal.
    /*
     header.setFilters({
     'footer': {
     'setting': {
     'enable': 1,
     'text/plain': 'You can haz footers!'
     }
     }
     });
     */

// setSendAt
// You can set the send_at scheduling param using an UNIX timestamp.
    header.setSendAt(1409348513);

// setSendEachAt
// You can set the send_each_at scheduling param using a list of UNIX timestamps.
//header.setSendEachAt([1409348513, 14093485134]);

// addSendEachAt
// You can append one or more send_each_at scheduling param(s) to the existing ones using an UNIX timestamp.
//header.setSendEachAt([1409348511, 14093485132]);
//header.addSendEachAt(1409348513]);
//header.addSendEachAt(14093485134);

// setASMGroupID
// You can set the ASM Group ID.
    header.setASMGroupID(123);

// [IP Pools](https://sendgrid.com/docs/API_Reference/Web_API_v3/IP_Management/ip_pools.html)
    header.setIpPool("testPool");

    console.log(header.jsonString());

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

    var objeto = {};

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
                msgMail: 'Email enviado com sucesso, logo entraremos em contato!',
                alert: 'msg'
            };
        }

        res.render('index', objeto);
    });


}
