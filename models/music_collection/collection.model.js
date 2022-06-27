const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Album = require('./subdocuments/album.schema')

const Collection = mongoose.model('Collection', Schema({
    artist: String,
    genres: Array,
    discography: [Album]
}));

module.exports = Collection;