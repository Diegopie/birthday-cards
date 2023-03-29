const router = require('express').Router();
const booNote24 = require('./booNote.routes');
const past = require('./past.routes');

router.use('/api/boo-note', booNote24);
router.use('/api/past', past);


module.exports = router;