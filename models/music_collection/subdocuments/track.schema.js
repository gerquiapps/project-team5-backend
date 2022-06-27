const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Track = new Schema( {
    number: Number,
    title: String,
    duration: String,
    file_location: String
});


module.exports = Track;