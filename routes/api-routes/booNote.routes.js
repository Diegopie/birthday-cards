const noteRouter = require('express').Router();
const { BooNotes, BooNote25, BooNote24, BooNote23 } = require('../../models');

const CurrentBday = BooNotes;

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

// ** Get All Notes (BooNotes will store all notes moving forward)
noteRouter.get('/all', ({ headers }, res) => {
    let Modal;

    switch (headers.year) {
        case '/':
            Modal = CurrentBday;
            break;
        case '/23':
            Modal = BooNote23;
            break;
        case '/24':
            Modal = BooNote24;
            break;
        case '/25':
            Modal = BooNote25;
            break;
        default:
            Modal = CurrentBday;
            break;
    }

    Modal.find({}, (err, notes) => {
        if (err) res.status(500).json(
            handleError('Error Has Occurred in Database Search', '/api/boo-note/all', err, true)
        );

        if (notes) res.status(400).json(
            { notes }
        )
    });
});

// * Create New Note
noteRouter.post('/new', (req, res) => {
    const note = new CurrentBday(req.body);
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
noteRouter.put('/edit', (req, res) => {
    // console.log(req.body);
    const { id, note, signature } = req.body;
    // console.log({id, note, signature });
    CurrentBday.findByIdAndUpdate(
        { _id: id },
        { $set: { note: note, signature: signature } },
        { new: true },
        (err, note) => {
            if (err) res.status(500).json(
                handleError('Error Has Occurred in Database Search', '/api/boo-note/all', err, true)
            );
            if (note) {
                res.status(200).json(
                    handleError('Successfully Saved Note', '/api/boo-note/new', err, false)
                );
            }
        }
    )
});


noteRouter.put('/deletePhoto', (req, res) => {
    // console.log(req.body);
    const { id, photos } = req.body;
    // console.log({id, note, signature });
    CurrentBday.findByIdAndUpdate(
        { _id: id },
        { $set: { photos: photos } },
        { new: true },
        (err, note) => {
            if (err) res.status(500).json(
                handleError('Error Has Occurred in Database Search', '/api/boo-note/all', err, true)
            );
            if (note) {
                res.status(200).json(
                    handleError('Successfully Saved Note', '/api/boo-note/new', err, false)
                );
            }
        }
    )
});

module.exports = noteRouter;
