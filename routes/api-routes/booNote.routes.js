const noteRouter = require('express').Router();
const { BooNote } = require('../../models');

// * Print Errors and Create Response Object 
const handleError = (message, route, err, msgError) => {
    if (route && err) console.log({ route }, err);
    return {
        message: {
            msgBody: message,
            msgError: msgError,
            error: err
        }
    };
};


// * Create New Note
noteRouter.post('/new', (req, res) => {
    const note = new BooNote(req.body);
    note.save(err => {
        if (err) res.status(500).json(
            handleError('Error Saving Note in Database', '/api/boo-note/new', err, true)
        );
        else {
            res.status(200).json(
                handleError('Successfully Saved Note', '/api/boo-note/new', err, false)
            );
        }
    });
});

// ** Get All Notes
noteRouter.get('/all', (req, res) => {
    BooNote.find({}, (err, notes) => {
        if (err) res.status(500).json(
            handleError('Error Has Occurred in Database Search', '/api/boo-note/all', err, true)
        );
        
        if (notes) res.status(400).json(
            { notes }
        )
    });
});

// ** Get All Notes
noteRouter.put('/edit', (req, res) => {
    // console.log(req.body);
    const {id, note, signature } = req.body;
    // console.log({id, note, signature });
     BooNote.findByIdAndUpdate(
        { _id: id },
        { $set: { note: note, signature: signature}},
        { new: true },
        (err, note) => {
            if (err) res.status(500).json(
                handleError('Error Has Occurred in Database Search', '/api/boo-note/all', err, true)
            );
            console.log(note)
        }
    )
    // BooNote.findByIdAndUpdate(id, (err, notes) => {
    //     if (err) res.status(500).json(
    //         handleError('Error Has Occurred in Database Search', '/api/boo-note/all', err, true)
    //     );
    //     console.log(notes)
        
    //     // if (notes) res.status(400).json(
    //     //     { notes }
    //     // )
    // });
});

module.exports = noteRouter;
