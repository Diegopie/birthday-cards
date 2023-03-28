const router = require('express').Router();
const booNote24 = require('./booNote.routes');
// const admin = require('./admin.routes');

router.use('/api/boo-note', booNote24);
// router.use('/api/admin', admin);


module.exports = router;