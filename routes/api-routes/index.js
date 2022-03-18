const router = require('express').Router();
const dianaNote = require('./dianaNote.routes');
// const admin = require('./admin.routes');

router.use('/api/diana-note', dianaNote);
// router.use('/api/admin', admin);


module.exports = router;