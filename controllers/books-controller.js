const Books = require('../models/books');

module.exports = {

    list(req, res) {
        return Books.findAll({
            include: [{
                model: Books,
                as: 'books'
            }],
        })
            .then((books) => res.status(200).send(books))
            .catch((error) => { res.status(400).send(error); });
    },

    getById(req, res) {
        return Books
          .findByPk(req.params.id, {
            include: [{
              model: Books,
              as: 'books'
            }],
          })
          .then((book) => {
            if (!book) {
              return res.status(404).send({
                message: 'Book Not Found',
              });
            }
            return res.status(200).send(book);
          })
          .catch((error) => {
            console.log(error);
            res.status(400).send(error);
          });
      },

      add(req, res) {
        return Books
          .create({
            title: req.body.title,
            author: req.body.author,
            isDeleted: false,
            isBorrowed: false
          })
          .then((book) => res.status(201).send(book))
          .catch((error) => res.status(400).send(error));
      },
    
      update(req, res) {
        return Books
          .findByPk(req.params.id, {
            include: [{
              model: Books,
              as: 'books'
            }],
          })
          .then(book => {
            if (!book) {
              return res.status(404).send({
                message: 'Book Not Found',
              });
            }
            return book
              .update({
                title: req.body.title,
                author: req.body.author,
                isDeleted: req.body.isDeleted,
                isBorrowed: req.body.isBorrowed,
                userId: req.body.userId
            })
              .then(() => res.status(200).send(book))
              .catch((error) => res.status(400).send(error));
          })
          .catch((error) => res.status(400).send(error));
      },
    
      delete(req, res) {
        return Books
          .findByPk(req.params.id)
          .then(book => {
            if (!book) {
              return res.status(400).send({
                message: 'Book Not Found',
              });
            }
            return book
              .destroy()
              .then(() => res.status(204).send('Successfully deleted.'))
              .catch((error) => res.status(400).send(error));
          })
          .catch((error) => res.status(400).send(error));
      }

};