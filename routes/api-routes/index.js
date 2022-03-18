const router = require('express').Router();
const booNote = require('./booNote.routes');
// const admin = require('./admin.routes');

router.use('/api/boo-note', booNote);
// router.use('/api/admin', admin);


module.exports = router;