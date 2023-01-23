var express = require('express');
var router = express.Router();



router.use('/companies', require('./companyRouter'));
router.use('/bills', require('./billRouter'));

module.exports = router;
