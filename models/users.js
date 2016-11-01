module.exports = function (sequelize, Sequelize) {
    var Users = sequelize.define('Users', {
        username   : Sequelize.STRING,
        password   : Sequelize.STRING,
        email      : Sequelize.STRING,
        firstname  : Sequelize.STRING,
        lastname   : Sequelize.STRING,
        nickname   : Sequelize.STRING,
        admin      : Sequelize.BOOLEAN, //true = administrador, false = usuario comum
        status     : Sequelize.BOOLEAN,  //true usuario habilitado, false = usuario deshabilitado
        statusChat : Sequelize.BOOLEAN  //true usuario habilitado, false = usuario deshabilitado
    });

    return Users;
}

