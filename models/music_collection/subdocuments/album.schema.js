const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Track = require('./track.schema');

const Album = new Schema( {
    number: Number,
    cover_file: String,
    title: String,
    date: Date,
    tracks: [Track]
});


module.exports = Album;