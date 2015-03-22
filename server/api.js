'use strict';

var router = require('express').Router();

router.get('/', function(req, res) {
  res.json({ success: true, message: 'You made it!' });
});

module.exports = router;

