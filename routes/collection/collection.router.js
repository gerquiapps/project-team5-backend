const express = require('express');
const router = express.Router();
const { collectionMain, collectionSearchBy } = require('../../controllers/collection/collection.controller');

router.get('/', (req, res) => {
    return collectionMain(req, res);
});

router.get('/searchBy', (req, res) => {
    return collectionSearchBy(req, res);
});

module.exports = router;