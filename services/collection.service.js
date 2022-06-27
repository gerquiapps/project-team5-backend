const Collection = require('../models/music_collection/collection.model');

function main() {
    return new Promise(async (resolve, reject) => {
        try {

            let results = await Collection.find({});
            resolve({
                code: 200,
                message: 'Main results obtained',
                results
            });
        } catch (err) {
            reject({
                code: 500,
                message: 'Se produjo un error al crear el usuario',
                err
            });
        }

    })
}

function searchBy(paramType, value) {
    return new Promise(async (resolve, reject) => {
        try {
            let filter = {};
            filter[paramType] = value;

            let results = await Collection.find(filter);
            resolve({
                code: 200,
                message: 'SearchBy results obtained',
                results
            });
        } catch (err) {
            reject({
                code: 500,
                message: 'Se produjo un error al crear el usuario',
                err
            });
        }

    })

}

module.exports = { main, searchBy };