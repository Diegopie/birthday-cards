const mongoose = require('mongoose');

const BooNotesSchema = new mongoose.Schema({
    bday: {
        type: Number,
        required: true
    },
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

const BooNotes = mongoose.model('BooNotes', BooNotesSchema);

module.exports = BooNotes;