const Borrows = require('../models/borrowhistory');

module.exports = {

    list(req, res) {
        return Borrows.findAll({
            include: [{
                model: Borrows,
                as: 'borrows'
            }],
        })
            .then((borrows) => res.status(200).send(borrows))
            .catch((error) => { res.status(400).send(error); });
    },

    getById(req, res) {
        return Borrows
          .findByPk(req.params.id, {
            include: [{
              model: Borrows,
              as: 'borrow'
            }],
          })
          .then((borrow) => {
            if (!borrow) {
              return res.status(404).send({
                message: 'Borrow History Not Found',
              });
            }
            return res.status(200).send(borrow);
          })
          .catch((error) => {
            console.log(error);
            res.status(400).send(error);
          });
      },

      add(req, res) {
        return Borrows
          .create({
            bookId: req.body.bookId,
            userId: req.body.userId,
            borrowedDate: new Date()    // get current date
          })
          .then((borrow) => res.status(201).send(borrow))
          .catch((error) => res.status(400).send(error));
      },
    
      update(req, res) {
        return Borrows
          .findByPk(req.params.id, {
            include: [{
              model: Borrows,
              as: 'borrow'
            }],
          })
          .then(borrow => {
            if (!borrow) {
              return res.status(404).send({
                message: 'Borrow History Not Found',
              });
            }
            return borrow
              .update({
                bookId: req.body.bookId,
                userId: req.body.userId,
                borrowedDate: req.body.borrowedDate
            })
              .then(() => res.status(200).send(borrow))
              .catch((error) => res.status(400).send(error));
          })
          .catch((error) => res.status(400).send(error));
      },
    
      delete(req, res) {
        return Borrows
          .findByPk(req.params.id)
          .then(borrow => {
            if (!borrow) {
              return res.status(400).send({
                message: 'Borrow History Not Found',
              });
            }
            return borrow
              .destroy()
              .then(() => res.status(204).send('Successfully deleted.'))
              .catch((error) => res.status(400).send(error));
          })
          .catch((error) => res.status(400).send(error));
      }

};