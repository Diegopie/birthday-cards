const mongoose = require('mongoose');

const BooNote24Schema = new mongoose.Schema({
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
    }
});

const BooNote24 = mongoose.model('Boo-Note-24', BooNote24Schema);

module.exports = BooNote24;