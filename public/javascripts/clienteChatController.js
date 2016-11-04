var app = angular.module('app', ['socket-io']);

//usando a variavel app que foi criada no module
app.controller('clienteChatController', function($scope, $http, socket) {


    /*###### INICIO DAS VARIAVEIS UTILIZADAS NO PROJETO  #######*/

    //exibir o chat conforme os valores forem alterados para true ou false
    $scope.exibirChat = true;
    //sinalizar se o usuario esta online conforme os valores forem alterados para true ou false
    $scope.online     = false;
    //sinalizar se o usuario esta offline conforme os valores forem alterados para true ou false
    $scope.offline    = true;

    //variavel responsavel por exibir ou nao o usario secundario
    $scope.exibirBatePapo = false;

    //usuario principal do chat, utilizado para saber quem é o cliente
    $scope.usuarioTitular = $("#usuarioTitular").attr("data-usuarioTitular");

    //armazena uma nova mensagem que deve ser enviada
    $scope.novaMensagem = "";

    //array que vai armazenar a mensagem enviada para um determinado nick-name(consultor)
    $scope.consultorChat = [];

    /*###### FIM DAS VARIAVEIS UTILIZADAS NO PROJETO  #######*/

    /*###### INICIO SOCKET.IO ######*/

    //cria um novo cliente no socket
    socket.emit('entrar cliente', $scope.usuarioTitular);

    //recebe um array com os consultores disponiveis para este cliente
    socket.on('atualiza consultores', function (consultores) {

        $scope.consultores = consultores;

    });

    //envia uma mensagem para determinado consultor
    $scope.enviarmensagem = function () {

        //objeto com informacoes da conversa
        $scope.consultorChat.push({nickname : $scope.usuarioSecundarioNick, mensagem : $scope.novaMensagem});

        socket.emit('enviar mensagem', $scope.consultorChat);

        $scope.novaMensagem = '';

    }

    socket.on('nova mensagem', function (data) {

        //codigo para exibir mensagem e sua respectiva cor(branca ou verde)
        var id = 'msgUm';

        if(data.cor){
            id = "msgDois";
        }

        var elememto = angular.element(document.querySelector('#mensagens'));

        elememto.append("<div id='contemMsg'><div id='"+id+"'><span class='dataAtual'>[" + data.dataAtual + "]:</span>  "+ data.msg + "</div></div>");

    })

    socket.on('error', function(err){
        console.log('Parece que a conexao caiu');
    });

    /*###### FIM INICIO SOCKET.IO ######*/


    /*###### INICIO FUNCOES DO PROJETO ######*/

    //funcao acionada pelo evento ng-click para iniciar uma conversa com outro consultor
    $scope.iniciarBatePapo = function (consultor) {

        //exibe o usuario selecionado para conversar
        $scope.exibirBatePapo = true
        //nickname do consultor selecionado para iniciar uma conversa
        $scope.usuarioSecundarioNick = $("#nickUsuario").attr("data-nome");
        //foto do usuario selecionado para iniciar uma conversa
        $scope.usuarioSecundarioFoto = "/images/default.jpg";

    }

    /*###### FIM FUNCOES DO PROJETO ######*/

});
