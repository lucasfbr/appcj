var login = require('./login');
var signup = require('./signup');
var db = require('../models');


module.exports = function(passport){

    // Passport needs to be able to serialize and deserialize users to support persistent login sessions
    passport.serializeUser(function(user, done) {
        //console.log('serializing user: ');console.log(user);
        //done(null, user.id);
        done(null, user);
    });

    passport.deserializeUser(function(user, done) {

        db.Users.findById(user.id)
            .then(function (user) {
                //console.log('deserializing user:',user);
                done(null, user);
            })
            .catch(function (err) {
                //console.log('Erro buscar usuario pelo deserializeUser: ', err);
                done(err, user);
            })

    });

    // Setting up Passport Strategies for Login and SignUp/Registration
    login(passport);
    signup(passport);

}