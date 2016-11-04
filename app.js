var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var db = require('./models');
var passport = require('passport');
var expressSession = require('express-session');
var methodOverride = require('method-override');

var routes = require('./routes/index');
var users = require('./routes/users');
var servicos = require('./routes/servicos');
var portifolio = require('./routes/portifolio');
var quemsomos = require('./routes/quemsomos');


var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

//representa o cliente que esta acessando o chat
var cliente;
//representa o consultor que esta acessando o chat
var consultor;
//array para armazenar os clientes e os consultores disponiveis para chat
var clientes    = {};
var consultores = {};

//Isso simplesmente acrescenta socket.io a res em nosso ciclo de eventos.
app.use(function (req, res, next) {
    res.io = io;
    next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        var method = req.body._method
        delete req.body._method
        return method
    }
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Configuring Passport
app.use(expressSession({secret: 'keyboard cat'}));
app.use(passport.initialize());
app.use(passport.session());

// Using the flash middleware provided by connect-flash to store messages in session
// and displaying in templates
var flash = require('connect-flash');
app.use(flash());

// Initialize Passport
var initPassport = require('./passport/init');
initPassport(passport);

var admin = require('./routes/admin')(passport);
var chat = require('./routes/admin/chat')(io);

app.use('/', routes);
app.use('/users', users);
app.use('/servicos', servicos);
app.use('/portifolio', portifolio);
app.use('/quemsomos', quemsomos);
app.use('/admin/', admin);
app.use('/admin/chat', chat);

/*
 * INICIO EVENTOS SOCKET.IO
 */
//ao entrar na pagina do chat será disparado o evento connection
//este evento ja vem definido por padrao no socket.io
io.sockets.on('connection', function (socket) {


    socket.on('entrar cliente', function (nickname) {

        //busca todos os consultores cadastrados no banco e armazena no array consultores
        //buscaConsultores();

        //o nickname esta sendo criado dentro do socket
        socket.nickname = nickname;
        clientes[socket.nickname] = socket;

        console.log("Cliente " + socket.nickname + " entrou no chat");

    });

   socket.on('entrar consultor', function (nickname) {

        //busca todos os clientes liberados para o chat e armazena no array clientes
        //buscaClientes();

        //o nickname esta sendo criado dentro do socket
        socket.nickname = nickname;
        consultores[socket.nickname] = socket;

        console.log("Consultor " + socket.nickname + " entrou no chat");

    });

    //mensagem vinda do painel administratico, partindo do consultor para o cliente
    socket.on('mensagem para o cliente', function (dados) {

        //removendo os espaços em branco do inicio e do final da string
        var de           = dados.de
        var para         = dados.para;
        var mensagem     = dados.mensagem.trim();
        var dataAtual    = pegarDataAtual();

        //verificando se o destinatario existe no array de clientes
        //if(para in clientes) {


            console.log('DE : ' + de);

            //enviando para o cliente de destino
            //clientes[para].emit();
            clientes[para].emit('nova mensagem', {msg: mensagem, nick: socket.nickname, dataAtual: dataAtual, cor: true});

            consultores[de].emit('msg enviada pelo consultor', {msg: mensagem, nick: socket.nickname, dataAtual: dataAtual, cor: false});

        //replicando a mensagem para o consultor que enviou a mensagem
        //socket.emit('msg enviada pelo consultor', {msg: mensagem, nick: clientes[para].nickname, dataAtual: dataAtual});

        //}else{

            //envio de uma mensagem de alerta para o cliente
        //    console.log('O cliente : ' + para + ' nao foi encontrado!')
        //}

    });


    //mensagem vinda da area de chat do cliente
    socket.on('mensagem para o consultor', function (dados) {

        //removendo os espaços em branco do inicio e do final da string
        var nome         = dados[0].nickname;
        var mensagem     = dados[0].mensagem;
        var dataAtual    = pegarDataAtual();

        //verificando se o usuario existe no array de usuarios
        if(nome in consultores) {

            //enviando para o consultor de destino
            consultores[nome].emit('nova mensagem do cliente', {msg: mensagem, nick: socket.nickname, dataAtual: dataAtual, cor: true});

            //replicando a mensagem para o cliente que enviou a mensagem
            socket.emit('msg enviada pelo cliente', {msg: mensagem, nick: usuarios[nome].nickname, dataAtual: dataAtual});

        }else{

            //envio de uma mensagem de alerta para o cliente
            socket.emit('nova mensagem', {msg : "O usuário "+nome+" não foi encontrado", nick : socket.nickname});
        }

    });


    //ao fechar a pagina do chat sera disparado o evento disconnet
    //este evento ja vem definido por padrao no socket.io
    socket.on('disconnect', function () {

        if(socket.cliente){

            console.log(socket.cliente + " saiu do chat")

        }else if(socket.consultor){

            console.log(socket.consultor + " saiu do chat")

        }else{
            return;
        }

    })

    //utilizado pelos clientes para visualizar os consultores
    function atualizarConsultores() {

        //console.log('atualiza consultores : ' + consultores)

        io.sockets.emit('atualiza consultores', Object.keys(consultores));

    }

    //utilizado no painel administrativo para visualizar os clientes
    function atualizarClientes() {

        io.sockets.emit('atualiza clientes', Object.keys(clientes));

    }

    function pegarDataAtual() {
        var dataAtual = new Date();
        var dia = (dataAtual.getDate() < 10 ? '0' : '') + dataAtual.getDate();
        var mes = ((dataAtual.getMonth() + 1) < 10 ? '0' : '') + (dataAtual.getMonth() + 1);
        var ano = dataAtual.getFullYear();
        var hora = (dataAtual.getHours() < 10 ? '0' : '') + dataAtual.getHours();
        var minuto = (dataAtual.getMinutes() < 10 ? '0' : '') + dataAtual.getMinutes();
        var segundo = (dataAtual.getSeconds() < 10 ? '0' : '') + dataAtual.getSeconds();

        var dataFormatada = dia + "/" + mes + "/" + ano + " " + hora + ":" + minuto + ":" + segundo;
        return dataFormatada;
    }

    function buscaConsultores() {

        db.Users
            .findAll({
                where: {
                    admin: 1
                }
            })
            .then(function (result) {

                if (result) {

                    for(var i = 0; i < result.length; i++) {

                        //o nickname esta sendo criado dentro do socket
                        socket.nickname = result[i].nickname;

                        //usuario criado dentro do array usuarios
                        consultores[socket.nickname] = socket;

                    }

                    //atualiza nossa lista de consultores
                    atualizarConsultores();

                }else{
                    console.log("Nenhum consultor cadastrado até o momento!")
                }

            })
            .catch(function (err) {

                console.log('Erro ao efetuar a busca: ' + err);

            });

    }

    function buscaClientes() {

        db.Users
            .findAll({
                where: {
                    admin: 0,
                    status: 1,
                    statusChat: 1
                }
            })
            .then(function (result) {

                if (result) {

                    for(var i = 0; i < result.length; i++) {

                        //o nickname esta sendo criado dentro do socket
                        socket.nickname = result[i].nickname;

                        //usuario criado dentro do array usuarios
                        clientes[socket.nickname] = socket;

                    }

                    //atualiza nossa lista de consultores
                    atualizarClientes();

                }else{
                    console.log("Nenhum cliente cadastrado até o momento!")
                }

            })
            .catch(function (err) {

                console.log('Erro ao efetuar a busca: ' + err);

            });

    }

});
/*
 * FIM EVENTOS SOCKET.IO
 */


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


//module.exports = app;

module.exports = {app: app, server: server};
