const Tokens = require('../models/token');

module.exports = {

    list(req, res) {
        return Tokens.findAll({
            include: [{
                model: Tokens,
                as: 'tokens'
            }],
        })
            .then((tokens) => res.status(200).send(tokens))
            .catch((error) => { res.status(400).send(error); });
    },

    getById(req, res) {
        return Tokens
          .findByPk(req.params.id, {
            include: [{
              model: Tokens,
              as: 'token'
            }],
          })
          .then((token) => {
            if (!token) {
              return res.status(404).send({
                message: 'token Not Found',
              });
            }
            return res.status(200).send(token);
          })
          .catch((error) => {
            console.log(error);
            res.status(400).send(error);
          });
      },

      add(req, res) {
        return Tokens
          .create({
            review: req.body.review,
            isDeleted: req.body.isDeleted,
            bookId: req.body.bookId,
            userId: req.body.userId
          })
          .then((token) => res.status(201).send(token))
          .catch((error) => res.status(400).send(error));
      },
    
      update(req, res) {
        return Tokens
          .findByPk(req.params.id, {
            include: [{
              model: Tokens,
              as: 'token'
            }],
          })
          .then(token => {
            if (!token) {
              return res.status(404).send({
                message: 'token Not Found',
              });
            }
            return token
              .update({
                review: req.body.review,
                isDeleted: req.body.isDeleted,
                bookId: req.body.bookId,
                userId: req.body.userId
            })
              .then(() => res.status(200).send(token))
              .catch((error) => res.status(400).send(error));
          })
          .catch((error) => res.status(400).send(error));
      },
    
      delete(req, res) {
        return Tokens
          .findByPk(req.params.id)
          .then(token => {
            if (!token) {
              return res.status(400).send({
                message: 'token Not Found',
              });
            }
            return token
              .destroy()
              .then(() => res.status(204).send('Successfully deleted.'))
              .catch((error) => res.status(400).send(error));
          })
          .catch((error) => res.status(400).send(error));
      }

};