//usando a variavel app que foi criada no module
app.controller('redeSocialController', function ($scope) {

    //antes de qualquer variavel ou funcao deve-se usar o $scope
    //isto colocara qualquer variavel criada na memoria
    $scope.nome = 'Lucas Rosa';

    $scope.olaMundo = function () {

        alert('ola mundo angula')

    }

});
