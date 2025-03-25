const mongoose = require('mongoose');

const BooNote25Schema = new mongoose.Schema({
    note: {
        type: String,
        required: true
    },
    signature: {
        type: String,
        required: true
    },
    style: {
        type: Array,
        required: true,
    },
    localID: {
        type: String,
        required: true,
    },
    photos: {
        type: Array,
        required: false,
    }
});

const BooNote25 = mongoose.model('Boo-Note-25', BooNote25Schema);

module.exports = BooNote25;