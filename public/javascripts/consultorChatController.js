var app = angular.module('app', ['socket-io']);

//usando a variavel app que foi criada no module
app.controller('consultorChatController', function($scope, $http, socket) {

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


    /*###### FIM DAS VARIAVEIS UTILIZADAS NO PROJETO  #######*/


    /*###### INICIO SOCKET.IO ######*/

    //registra a entrada de um consultor e armazena no socket
    socket.emit('entrar consultor', $scope.usuarioTitular)

    //recebe uma lista de objetos com os clientes disponiveis e armazena em um array
    socket.on('atualiza clientes', function (data) {

        $scope.clientes = data;

    })

    //replica a mensagem enviada para o cliente na tela do cunsulto
    socket.on('msg enviada pelo consultor', function (data) {

        //codigo para exibir mensagem e sua respectiva cor(branca ou verde)
        var id = 'msgUm';

        if(data.cor){
            id = "msgDois";
        }

        var elememto = angular.element(document.querySelector('#mensagens'));

        elememto.append("<div id='contemMsg'><div id='"+id+"'><span class='dataAtual'>[" + data.dataAtual + "]:</span>  "+ data.msg + "</div></div>");

    })

    //inicia uma conversa com um determinado cliente
    $scope.iniciarBatePapo = function (cliente) {

        //alert('cliente : ' + cliente);

        //exibe o cliente selecionado para iniciar conversa
        $scope.exibirBatePapo = true;
        //armazena a foto do usuario
        $scope.usuarioSecundarioFoto = '/images/default.jpg';
        //armazena nome do cliente
        $scope.usuarioSecundarioNick = cliente;

    }

    //envia uma mensagem para um respectivo cliente
    $scope.enviarmensagem = function () {


        //objeto que conterá o destinatario(cliente) e a mensagem da conversa
        $scope.conversa = {
            de       :  $scope.usuarioTitular,
            //para     :  $scope.usuarioSecundarioNick,
            para     : 'isabel-ferreira',
            mensagem :  $scope.novaMensagem
        }


        //emit para o socket o array clienteChat
        socket.emit('mensagem para o cliente', $scope.conversa);

        //limpa o campo de mensagens
        $scope.novaMensagem = '';

    }

    /*###### FIM INICIO SOCKET.IO ######*/




});
