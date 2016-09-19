module.exports = function (sequelize, Sequelize) {
    var RedesSociais = sequelize.define('RedesSociais', {
        nome   : Sequelize.STRING,
        link   : Sequelize.STRING,
        imagem : Sequelize.STRING,
        status : {
            type : Sequelize.BOOLEAN,
            defaultValue : true
        }
     });

    return RedesSociais;
}

