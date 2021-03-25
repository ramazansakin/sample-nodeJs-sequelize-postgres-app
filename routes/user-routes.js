var express = require('express');
var router = express.Router();

const usersController = require('../controllers/users-controller');

/* Users - api routings */
//Keep them at the end of the route file for url parsing requests
router
  .get('/', usersController.getAll)
  .get('/:id', usersController.getOne)
  .post('/', usersController.createOne)
  .put('/:id', usersController.updateOne)
  .delete('/:id', usersController.deleteOne);


module.exports = router;