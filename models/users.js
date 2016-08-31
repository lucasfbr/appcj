module.exports = function (sequelize, Sequelize) {
    var Users = sequelize.define('Users', {
        username : Sequelize.STRING,
        password : Sequelize.STRING,
        email    : Sequelize.STRING,
        firstname: Sequelize.STRING,
        lastname : Sequelize.STRING
    });

    return Users;
}

