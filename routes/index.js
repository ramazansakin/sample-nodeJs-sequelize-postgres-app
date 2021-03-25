var express = require('express');
var router  = express.Router();

const controller = require('../controllers/index'); 


// test api for routing
router.get('/', function(req, res, next) {
  res.send('Welcome to Index page (Test api)');
}); 

router.get('/config', controller.getConfig);
router.get('/version', controller.getVersion);
router.get('/seq', controller.seq); //test sequelize connection

module.exports = router;