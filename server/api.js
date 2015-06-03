'use strict';

let router = require('express').Router();

router.get('/', (req, res) => {
  res.json({ success: true, message: 'You made it!' });
});

module.exports = router;

