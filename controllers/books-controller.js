var models = require('../models'); // loads index.js
var db = require('../config/config.json');

module.exports = {

    list(req, res) {
        return db.Books.findAll({
            include: [{
                model: Users,
                as: 'users'
            }]
        })
            .then((books) => res.status(200).send(books))
            .catch((error) => { res.status(400).send(error); });
    },

    getById(req, res) {
        return db.Books
          .findByPk(req.params.id, {
            include: [{
              model: Users,
              as: 'users'
            }]
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
        return db.Books
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
        return db.Books
          .findByPk(req.params.id, {
            include: [{
              model: Users,
              as: 'users'
            }]
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
        return db.Books
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