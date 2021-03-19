const Rates = require('../models/rate');

module.exports = {

    list(req, res) {
        return Rates.findAll({
            include: [{
                model: Rates,
                as: 'rates'
            }],
        })
            .then((rates) => res.status(200).send(rates))
            .catch((error) => { res.status(400).send(error); });
    },

    getById(req, res) {
        return Rates
          .findByPk(req.params.id, {
            include: [{
              model: Rates,
              as: 'rate'
            }],
          })
          .then((rate) => {
            if (!rate) {
              return res.status(404).send({
                message: 'Rate Not Found',
              });
            }
            return res.status(200).send(rate);
          })
          .catch((error) => {
            console.log(error);
            res.status(400).send(error);
          });
      },

      add(req, res) {
        return Rates
          .create({
            rate: req.body.rate,
            bookId: req.body.bookId,
            userId: req.body.userId
          })
          .then((rate) => res.status(201).send(rate))
          .catch((error) => res.status(400).send(error));
      },
    
      update(req, res) {
        return Rates
          .findByPk(req.params.id, {
            include: [{
              model: Rates,
              as: 'rate'
            }],
          })
          .then(rate => {
            if (!rate) {
              return res.status(404).send({
                message: 'Rate Not Found',
              });
            }
            return rate
              .update({
                rate: req.body.rate,
                bookId: req.body.bookId,
                userId: req.body.userId
            })
              .then(() => res.status(200).send(rate))
              .catch((error) => res.status(400).send(error));
          })
          .catch((error) => res.status(400).send(error));
      },
    
      delete(req, res) {
        return Rates
          .findByPk(req.params.id)
          .then(rate => {
            if (!rate) {
              return res.status(400).send({
                message: 'Rate Not Found',
              });
            }
            return rate
              .destroy()
              .then(() => res.status(204).send('Successfully deleted.'))
              .catch((error) => res.status(400).send(error));
          })
          .catch((error) => res.status(400).send(error));
      }

};