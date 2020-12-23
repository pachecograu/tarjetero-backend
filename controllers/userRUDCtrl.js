var userModel = require('../models/userModel');
var exepciones = require('./exepciones');

var userRUDController = {
  findAll: function (req, res, next) {
    console.log(req.query);
    userModel.find({}, '-password', function (err, users) {
      if (users) {
        res.json(users);
      }
      if (err) {
        exepciones(res, 500, err);
      } else if (!users) {
        exepciones(res, 404, 'No existen resultados');
      }
    })
  },
  findById: function (req, res, next) {
    console.log(req.query);
    if (!req.query._id) {
      exepciones(res, 400, 'El id es obligatorio');
      return;
    }
    userModel.findOne({
      _id: req.query.id
    }, '-password', function (err, user) {
      if (user) {
        res.json(user);
      }
      if (err) {
        exepciones(res, 500, err);
      } else if (!user) {
        exepciones(res, 400, 'Usuario no existe');
      }
    })
  },
  updateById: function (req, res, next) {
    // console.log(req.body);
    if (!req.body._id) {
      exepciones(res, 400, 'El id es obligatorio');
      return;
    }
    var info = {
      name: null,
      lastname: null,
      birthdate: null,
      phone: null,
      email: null,
      photo: null
    };
    for (const key in req.body) {
      for (const k in info) {
        if (k == key) {
          info[k] = req.body[key];
        }
      }
    }
    userModel.findOne({
      _id: req.body._id
    }, '-password', function (err, user) {
      if (user) {
        user.set(info);
        user.save(function (err, updatedUser) {
          console.log(err, updatedUser);
          if (updatedUser) {
            res.json({
              message: 'Usuario actualizado exitosamente!.',
              data: updatedUser
            });
          }
          if (err) {
            exepciones(res, 500, err);
          } else if (!updatedUser) {
            exepciones(res, 400, 'Usuario no existe');
          }
        });
      }
      if (err) {
        exepciones(res, 500, err);
      } else if (!user) {
        exepciones(res, 400, 'Usuario no existe');
      }
    })
  },
  deleteById: function (req, res, next) {
    // console.log(req.body);
    if (!req.body._id) {
      exepciones(res, 400, 'El id es obligatorio');
      return;
    }
    userModel.deleteOne({
      _id: req.body.id
    }, function (err, deletedUser) {
      console.log(err, deletedUser);
      if (deletedUser) {
        res.json({
          message: 'Usuario eliminado exitosamente'
        });
      }
      if (err) {
        exepciones(res, 500, err);
      } else if (!deletedUser) {
        exepciones(res, 400, 'Usuario no existe');
      }
    });
  }
};

module.exports = userRUDController;