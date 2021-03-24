var express = require('express');
var router = express.Router();

const usersController = require('../controllers/users-controller');

/* Users Router */
router.get('/', usersController.list);
router.get('/:id', usersController.getById);
router.post('/add', usersController.add);
router.post('/update', usersController.update);
router.get('/delete/:id', usersController.delete);


module.exports = router;