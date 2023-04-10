const noteRouter = require('express').Router();
const { BooNote24, BooNote23 } = require('../../models');

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

// ** Get All Notes
noteRouter.get('/all', ({ headers }, res) => {
    let modal;

    switch (headers.year) {
        case '/':
            modal = BooNote24;
            break;
        case '/23':
            modal = BooNote23;
            break;
        default:
            modal = BooNote24;
            break;
    }

    modal.find({}, (err, notes) => {
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
    const note = new BooNote24(req.body);
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
    BooNote24.findByIdAndUpdate(
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

module.exports = noteRouter;
