const router = require('express').Router();
const noteRouter = require('./booNote.routes');

router.use('/api/boo-note', noteRouter);


module.exports = router;