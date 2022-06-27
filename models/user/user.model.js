const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = mongoose.model('User', Schema({
    name: String,
    lastname: String,
    username: String,
    password: String,
    email: String,
    phone: String,
    picture: String,
    role: String
}));

module.exports = User;