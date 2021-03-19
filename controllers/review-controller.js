const Reviews = require('../models/reviews');

module.exports = {

    list(req, res) {
        return Reviews.findAll({
            include: [{
                model: Reviews,
                as: 'reviews'
            }],
        })
            .then((reviews) => res.status(200).send(reviews))
            .catch((error) => { res.status(400).send(error); });
    },

    getById(req, res) {
        return Reviews
          .findByPk(req.params.id, {
            include: [{
              model: Reviews,
              as: 'review'
            }],
          })
          .then((review) => {
            if (!review) {
              return res.status(404).send({
                message: 'review Not Found',
              });
            }
            return res.status(200).send(review);
          })
          .catch((error) => {
            console.log(error);
            res.status(400).send(error);
          });
      },

      add(req, res) {
        return Reviews
          .create({
            review: req.body.review,
            isDeleted: req.body.isDeleted,
            bookId: req.body.bookId,
            userId: req.body.userId
          })
          .then((review) => res.status(201).send(review))
          .catch((error) => res.status(400).send(error));
      },
    
      update(req, res) {
        return Reviews
          .findByPk(req.params.id, {
            include: [{
              model: Reviews,
              as: 'review'
            }],
          })
          .then(review => {
            if (!review) {
              return res.status(404).send({
                message: 'review Not Found',
              });
            }
            return review
              .update({
                review: req.body.review,
                isDeleted: req.body.isDeleted,
                bookId: req.body.bookId,
                userId: req.body.userId
            })
              .then(() => res.status(200).send(review))
              .catch((error) => res.status(400).send(error));
          })
          .catch((error) => res.status(400).send(error));
      },
    
      delete(req, res) {
        return Reviews
          .findByPk(req.params.id)
          .then(review => {
            if (!review) {
              return res.status(400).send({
                message: 'review Not Found',
              });
            }
            return review
              .destroy()
              .then(() => res.status(204).send('Successfully deleted.'))
              .catch((error) => res.status(400).send(error));
          })
          .catch((error) => res.status(400).send(error));
      }

};