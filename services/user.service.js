const User = require('../models/user/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const _ = require('lodash');


function signup(payload) {
    return new Promise((resolve, reject) => {
        // verificacion de usuario existente (falta)
        try {
            var user = new User({
                name: payload.name,
                lastname: payload.lastname,
                username: payload.username,
                email: payload.email,
                phone: payload.phone,
                picture: payload.picture,
                role: payload.role
            });
            bcrypt.hash(payload.password, 10, (err, hash) => {

                if (err) {
                    throw err;
                }
                try {
                    user.password = hash;
                    user.save()
                        .then(user => {
                            user.password = 'hidden';
                            resolve({
                                code: 200,
                                message: 'Usuario creado correctamente',
                                user
                            });
                        }).catch(err => {
                            reject({
                                code: 500,
                                message: 'Error al crear el usuario',
                                err
                            });
                        });

                } catch (err) {
                    reject({
                        code: 500,
                        message: 'Se produjo un error al crear el usuario',
                        err
                    });
                }
            });
        } catch (err) {
            reject({
                code: 500,
                message: 'Se produjo un error al crear el usuario',
                err
            });
        }
    });
}

function login(payload) {
    return new Promise((resolve, reject) => {
        User.findOne({ email: payload.email }, (err, user) => {
            if (err) {
                reject({
                    code: 401,
                    message: 'Usuario no encontrado'
                });
            } else {
                if (user) {
                    const hash = user.password;
                    bcrypt.compare(payload.password, hash, (err, result) => {
                        if (err) {
                            reject({
                                code: 401,
                                message: 'Password incorrecto'
                            });

                        } else {
                            if (result) {
                                user.password = 'hidden';
                                const token = jwt.sign({ user }, process.env['JWT_SECRET'], { expiresIn: '3h' });
                                let _user = JSON.parse(JSON.stringify(user)); // deep clone
                                delete _user.__v;
                                _user.token = token;
                                _user = _.assign(_user, { password: 'hidden' });
                                resolve({
                                    code: 200,
                                    message: 'Login correcto',
                                    user: _user
                                });
                            }
                            else {
                                reject({
                                    code: 401,
                                    message: 'Password incorrecto'
                                });
                            }
                        }
                    });

                } else {
                    reject(
                        {
                            code: 401,
                            message: 'Usuario no encontrado'
                        }
                    );
                }
            }
        });
    });
}

function verifyEmail(payload) {
    return new Promise((resolve, reject) => {
        User.findOne({ email: payload.email }, (err, user) => {
            if (err) {
                reject({
                    code: 401,
                    message: 'Usuario no encontrado'
                });
            } else {
                if (user) {
                    resolve(
                        {
                            code: 200,
                            message: 'Usuario existente'
                        }
                    );
                } else {
                    reject(
                        {
                            code: 401,
                            message: 'Usuario no encontrado'
                        }
                    );
                }
            }
        });
    });
}

function changePassword(payload) {
    return new Promise((resolve, reject) => {
        try {
            User.findOne({ email: payload.email }, (err, user) => {
                if (err) {
                    reject({
                        code: 401,
                        message: 'Usuario no encontrado'
                    });
                } else {
                    if (user) {
                        bcrypt.hash(payload.password, 10, (err, hash) => {

                            if (err) {
                                throw err;
                            }
                            try {
                                user.password = hash;
                                user.save()
                                    .then(user => {
                                        user.password = 'hidden';
                                        resolve({
                                            code: 200,
                                            message: 'Password modificado correctamente',
                                            user
                                        });
                                    }).catch(err => {
                                        reject({
                                            code: 500,
                                            message: 'Error al modificar password',
                                            err
                                        });
                                    });

                            } catch (err) {
                                reject({
                                    code: 500,
                                    message: 'Se produjo un error al modificar password',
                                    err
                                });
                            }
                        });
                    } else {
                        reject(
                            {
                                code: 401,
                                message: 'Usuario no encontrado'
                            }
                        );
                    }
                }
            });
        } catch (err) {
            reject({
                code: 500,
                message: 'Se produjo un error al crear el usuario',
                err
            });
        }
    });
}


module.exports = { signup, login, verifyEmail, changePassword };