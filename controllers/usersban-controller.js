const Bans = require('../models/usersban');

module.exports = {

    list(req, res) {
        return Bans.findAll({
            include: [{
                model: Bans,
                as: 'bans'
            }],
        })
            .then((bans) => res.status(200).send(bans))
            .catch((error) => { res.status(400).send(error); });
    },

    getById(req, res) {
        return Bans
          .findByPk(req.params.id, {
            include: [{
              model: Bans,
              as: 'ban'
            }],
          })
          .then((ban) => {
            if (!ban) {
              return res.status(404).send({
                message: 'ban Not Found',
              });
            }
            return res.status(200).send(ban);
          })
          .catch((error) => {
            console.log(error);
            res.status(400).send(error);
          });
      },

      add(req, res) {
        return Bans
          .create({
            banned: req.body.banned,
            describtion: req.body.describtion,
            userId: req.body.userId
          })
          .then((ban) => res.status(201).send(ban))
          .catch((error) => res.status(400).send(error));
      },
    
      update(req, res) {
        return Bans
          .findByPk(req.params.id, {
            include: [{
              model: Bans,
              as: 'ban'
            }],
          })
          .then(ban => {
            if (!ban) {
              return res.status(404).send({
                message: 'ban Not Found',
              });
            }
            return ban
              .update({
                banned: req.body.banned,
                describtion: req.body.describtion,
                userId: req.body.userId
            })
              .then(() => res.status(200).send(ban))
              .catch((error) => res.status(400).send(error));
          })
          .catch((error) => res.status(400).send(error));
      },
    
      delete(req, res) {
        return Bans
          .findByPk(req.params.id)
          .then(ban => {
            if (!ban) {
              return res.status(400).send({
                message: 'ban Not Found',
              });
            }
            return ban
              .destroy()
              .then(() => res.status(204).send('Successfully deleted.'))
              .catch((error) => res.status(400).send(error));
          })
          .catch((error) => res.status(400).send(error));
      }

};