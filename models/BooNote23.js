const mongoose = require('mongoose');

const BooNote23Schema = new mongoose.Schema({
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

const BooNote23 = mongoose.model('Boo-Note', BooNote23Schema);

module.exports = BooNote23;