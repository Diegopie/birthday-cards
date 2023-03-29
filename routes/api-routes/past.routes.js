const noteRouter = require('express').Router();
const { BooNote23 } = require('../../models');

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
noteRouter.get('/23', (req, res) => {
    BooNote23.find({}, (err, notes) => {
        if (err) res.status(500).json(
            handleError('Error Has Occurred in Database Search', '/api/boo-note/all', err, true)
        );
        
        if (notes) res.status(400).json(
            { notes }
        )
    });
});


module.exports = noteRouter;
