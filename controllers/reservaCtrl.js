//Require Mongoose
var mongoose = require('mongoose');
var reservaModel = require('../models/reservaModel');
var jwt = require('jsonwebtoken');

var reservaController = {
  create: function(req, res, next) {
    console.log('create', req.body);
    var info = {
      reservaDate: new Date(),
      idBaberie: mongoose.Types.ObjectId(req.body.idBaberie),
      idUser: mongoose.Types.ObjectId(req.body.idUser),
      idBarber: mongoose.Types.ObjectId(req.body.idBarber),
      services: []
    };
    if (req.body.services && req.body.services.length) {
      for (var i = 0; i < req.body.services.length; i++) {
        info.services.push({
          id: mongoose.Types.ObjectId(req.body.services[i].id),
        });
      }
    }
    reservaModel.create({
      idUser: info.idUser,
      idBarberie: info.idBarberie,
      idBarber: info.idBarber,
      reservaDate: info.reservaDate,
      services: info.services
    }, function(err, result) {
      console.log('create', err, result);
      if (err) {
        res.json({
          state: 'error',
          message: 'No pudimos crear tu reserva, intentalo nuevamente.'
        })
        next(err)
      } else {
        res.json({
          state: 'success',
          message: 'Reserva creada exitosamente'
        })
      }
    });
  },
  findByBarber: function(req, res, next) {
    console.log(req.query);
    reservaModel.find({
      idBarber: req.query.idBarber
    }, function(err, reservas) {
      res.json(reservas);
    })
  },
  findByUser: function(req, res, next) {
    console.log(req.query);
    reservaModel.find({
      idUser: req.query.idUser
    }, function(err, reservas) {
      res.json(reservas);
    })
  }
};

module.exports = reservaController;
