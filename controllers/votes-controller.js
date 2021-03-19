const Votes = require('../models/votes');

module.exports = {

    list(req, res) {
        return Votes.findAll({
            include: [{
                model: Votes,
                as: 'votes'
            }],
        })
            .then((votes) => res.status(200).send(votes))
            .catch((error) => { res.status(400).send(error); });
    },

    getById(req, res) {
        return Votes
          .findByPk(req.params.id, {
            include: [{
              model: Votes,
              as: 'vote'
            }],
          })
          .then((vote) => {
            if (!vote) {
              return res.status(404).send({
                message: 'vote Not Found',
              });
            }
            return res.status(200).send(vote);
          })
          .catch((error) => {
            console.log(error);
            res.status(400).send(error);
          });
      },

      add(req, res) {
        return Votes
          .create({
            liked: req.body.liked,
            reviewId: req.body.reviewId,
            userId: req.body.userId
          })
          .then((vote) => res.status(201).send(vote))
          .catch((error) => res.status(400).send(error));
      },
    
      update(req, res) {
        return Votes
          .findByPk(req.params.id, {
            include: [{
              model: Votes,
              as: 'vote'
            }],
          })
          .then(vote => {
            if (!vote) {
              return res.status(404).send({
                message: 'vote Not Found',
              });
            }
            return vote
              .update({
                liked: req.body.liked,
                reviewId: req.body.reviewId,
                userId: req.body.userId
            })
              .then(() => res.status(200).send(vote))
              .catch((error) => res.status(400).send(error));
          })
          .catch((error) => res.status(400).send(error));
      },
    
      delete(req, res) {
        return Votes
          .findByPk(req.params.id)
          .then(vote => {
            if (!vote) {
              return res.status(400).send({
                message: 'vote Not Found',
              });
            }
            return vote
              .destroy()
              .then(() => res.status(204).send('Successfully deleted.'))
              .catch((error) => res.status(400).send(error));
          })
          .catch((error) => res.status(400).send(error));
      }

};