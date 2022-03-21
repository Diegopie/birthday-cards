const mongoose = require('mongoose');

const BooNoteSchema = new mongoose.Schema({
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

const BooNote = mongoose.model('Boo-Note', BooNoteSchema);

module.exports = BooNote;