const express = require('express');
const router = express.Router();
const indexRouter = require('./indexRouter');
const apiRouter = require('./apiRouter');

router.use('/', indexRouter);
router.use('/api', apiRouter );

module.exports = router;