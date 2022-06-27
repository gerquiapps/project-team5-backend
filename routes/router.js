const express = require('express');
const router = express.Router();
const user = require('./user/user.router');
const collection = require('./collection/collection.router');
const tokenMiddleware = require('../middlewares/token.middleware');

router.use('/user', user);

router.use('*', tokenMiddleware);
router.use('/collection', collection);

module.exports = router;