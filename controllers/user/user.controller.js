const { signup, login, verifyEmail, changePassword } = require('../../services/user.service');

function userSignup(req, res) {
    const payload = req.body;
    signup(payload)
        .then(result => {
            res.status(200).send(result);
        })
        .catch(err => {
            res.status(err.code).send(err);
        });
}

function userLogin(req, res) {
    const payload = req.body;
    login(payload)
        .then(result => {
            res.status(200).send(result);
        })
        .catch(err => {
            res.status(err.code).send(err);
        });
}

function userVerifyEmail(req, res) {
    const payload = req.query;
    console.log(payload)
    verifyEmail(payload)
        .then(result => {
            res.status(200).send(result);
        })
        .catch(err => {
            res.status(err.code).send(err);
        });
}

function userChangePassword(req, res) {
    const payload = req.body;
    changePassword(payload)
        .then(result => {
            res.status(200).send(result);
        })
        .catch(err => {
            res.status(err.code).send(err);
        });
}

module.exports = { userSignup, userLogin, userVerifyEmail, userChangePassword };