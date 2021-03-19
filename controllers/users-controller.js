const Users = require('../models/users');

module.exports = {

    list(req, res) {
        return Users.findAll({
            include: [{
                model: Users,
                as: 'users'
            }],
        })
            .then((users) => res.status(200).send(users))
            .catch((error) => { res.status(400).send(error); });
    },

    getById(req, res) {
        return Users
          .findByPk(req.params.id, {
            include: [{
              model: Users,
              as: 'user'
            }],
          })
          .then((user) => {
            if (!user) {
              return res.status(404).send({
                message: 'User Not Found',
              });
            }
            return res.status(200).send(user);
          })
          .catch((error) => {
            console.log(error);
            res.status(400).send(error);
          });
      },

      add(req, res) {
        return Users
          .create({
            username: req.body.username,
            password: req.body.password,
            role: req.body.role,
            avatarPath: 'avatar-path-link-resource-link-here',
            isDeleted: false
          })
          .then((user) => res.status(201).send(user))
          .catch((error) => res.status(400).send(error));
      },
    
      update(req, res) {
        return Users
          .findByPk(req.params.id, {
            include: [{
              model: Users,
              as: 'user'
            }],
          })
          .then(user => {
            if (!user) {
              return res.status(404).send({
                message: 'User Not Found',
              });
            }
            return user
              .update({
                username: req.body.username,
                password: req.body.password,
                role: req.body.role,
                avatarPath: 'new-avatar-path-link-resource-link-here'
            })
              .then(() => res.status(200).send(user))
              .catch((error) => res.status(400).send(error));
          })
          .catch((error) => res.status(400).send(error));
      },
    
      delete(req, res) {
        return Users
          .findByPk(req.params.id)
          .then(user => {
            if (!user) {
              return res.status(400).send({
                message: 'User Not Found',
              });
            }
            return user
              .destroy()
              .then(() => res.status(204).send('Successfully deleted.'))
              .catch((error) => res.status(400).send(error));
          })
          .catch((error) => res.status(400).send(error));
      }

};