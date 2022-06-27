const { main, searchBy } = require('../../services/collection.service');

function collectionMain(req, res) {

    main()
        .then(result => {
            res.status(200).send(result);
        })
        .catch(err => {
            res.status(err.code).send(err);
        });
}

function collectionSearchBy(req, res) {

    let paramType = req.query['paramType'];
    let value = req.query['value'];

    searchBy(paramType, value)
        .then(result => {
            res.status(200).send(result);
        })
        .catch(err => {
            res.status(err.code).send(err);
        });
}

module.exports = { collectionMain, collectionSearchBy };