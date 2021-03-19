var express = require('express');
var router = express.Router();

const usersController = require('../controllers/users-controller');

/* Users Router */
router.get('/', usersController.list);
router.get('/:id', usersController.getById);
router.post('/add', usersController.add);
router.post('/update', usersController.update);
router.get('/delete/:id', usersController.delete);

const booksController = require('../controllers/books-controller');

/* Books Router */
router.get('/', booksController.list);
router.get('/:id', booksController.getById);
router.post('/add', booksController.add);
router.post('/update', booksController.update);
router.get('/delete/:id', booksController.delete);


module.exports = router;