var express = require('express');
var router = express.Router();

const booksController = require('../controllers/books-controller');

/* Books - api routings */
router.get('/', booksController.list);
router.get('/:id', booksController.getById);
router.post('/add', booksController.add);
router.post('/update', booksController.update);
router.get('/delete/:id', booksController.delete);


module.exports = router;