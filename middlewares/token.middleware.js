const jwt = require('jsonwebtoken');
var admin = require("firebase-admin");

var serviceAccount = require("../project-5912398450612195027-firebase-adminsdk-fmyx0-cbdbe56ed5.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});


function tokenMiddleware(req, res, next) {

    const headers = req.headers;
    const token = headers.authorization;
    if (token) {
        jwt.verify(token, process.env['JWT_SECRET'], (err, decoded) => {
            if (err) {
                console.log(err);
                try {
                    console.log('intentando con google')
                    // idToken comes from the client app
                    admin.auth()
                        .verifyIdToken(token)
                        .then((decodedToken) => {
                            console.log(decodedToken);
                            req.user = decodedToken;
                            next();
                        })
                        .catch((error) => {
                            console.log(error)
                            res.status(401).send({
                                code: 401,
                                message: 'Token invalido'
                            });
                        });
                } catch (err) {
                    console.log('error de token google')
                    console.log(err)
                    res.status(401).send({
                        code: 401,
                        message: 'Token invalido'
                    });
                }
            } else {
                req.user = decoded.user;
                next();
            }
        })
    } else {
        res.status(401).send({
            code: 401,
            message: 'Token inexistente'
        });
    }
}

module.exports = tokenMiddleware;