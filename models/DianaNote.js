const mongoose = require('mongoose');

const DianaNoteSchema = new mongoose.Schema({
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
    }
});

const DianaNote = mongoose.model('Diana-Note', DianaNoteSchema);

module.exports = DianaNote;