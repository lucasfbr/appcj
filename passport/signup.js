var LocalStrategy = require('passport-local').Strategy;
var bCrypt = require('bcrypt-nodejs');
var db = require('../models');

module.exports = function (passport) {

    passport.use('signup', new LocalStrategy({
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },
        function (req, username, password, done) {

            findOrCreateUser = function () {
                // find a user in Mongo with provided username

                db.Users.findOne({
                    where: {'username': username}

                })
                    .then(function (user) {

                            // already exists
                            if (user) {
                                console.log('Usuario ja existe no sistema: ' + username);
                                return done(null, false, req.flash('message', 'Usuário já registrado no sistema!'));
                            } else {
                                // if there is no user with that email
                                // create the user

                                db.Users.create({
                                    username: username,
                                    password: createHash(password),
                                    email: req.param('email'),
                                    firstname: req.param('firstName'),
                                    lastname: req.param('lastName'),
                                    admin: false,
                                    status: true
                                })
                                    .then(function (newUser) {
                                        console.log('Usuario registrado com sucesso');
                                        return done(null, newUser);
                                    })
                                    .catch(function (err) {
                                        console.log('Ocorreu um erro ao criar um novo usuario: ', err);
                                    })

                            }
                    })
                    .catch(function (err) {
                        console.log('Ocorreu um erro ao fazer a busca: ', err);
                    })


            };
            // Delay the execution of findOrCreateUser and execute the method
            // in the next tick of the event loop
            process.nextTick(findOrCreateUser);
        })
    );

    // Generates hash using bCrypt
    var createHash = function (password) {
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    }

}