const express = require('express');
const router = express.Router();
const { userSignup, userLogin, userVerifyEmail, userChangePassword } = require('../../controllers/user/user.controller');


router.post('/signup', (req, res) => {
    return userSignup(req, res);
});

router.post('/login', (req, res) => {
    return userLogin(req, res);
});

router.get('/verifyEmail', (req, res) => {
    return userVerifyEmail(req, res);
});

router.put('/changePassword', (req, res) => {
    return userChangePassword(req, res);
});

module.exports = router;