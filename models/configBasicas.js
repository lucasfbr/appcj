module.exports = function (sequelize, Sequelize) {
    var ConfigBasicas = sequelize.define('ConfigBasicas', {
        nomeEmpresa     : Sequelize.STRING,
        logotipo        : Sequelize.STRING,
        email           : Sequelize.STRING,
        estado          : Sequelize.STRING,
        cidade          : Sequelize.STRING,
        bairro          : Sequelize.STRING,
        endereco        : Sequelize.STRING,
        numero          : Sequelize.STRING,
        telefone        : Sequelize.STRING,
        endGoogleMaps   : Sequelize.STRING,
        emailContato    : Sequelize.STRING,
        usuarioPagseguro: Sequelize.STRING,
        senhaPagseguro  : Sequelize.STRING,
        keyPagseguro    : Sequelize.STRING,
    });

    return ConfigBasicas;
}

