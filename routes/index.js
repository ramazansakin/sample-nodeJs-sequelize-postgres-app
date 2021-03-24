var express = require('express');
var router  = express.Router();

// test api for routing
router.get('/', function(req, res, next) {
  res.send('Welcome to Index page (Test api)');
});

module.exports = router;