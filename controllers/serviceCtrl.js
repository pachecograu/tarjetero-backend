//Require Mongoose
var mongoose = require('mongoose');
var serviceModel = require('../models/serviceModel');

var serviceController = {
  create: function(req, res, next) {
    console.log('create', req.body);
    var info = {};
    info = {
      idBaberie: mongoose.Types.ObjectId(req.body.idBaberie),
      description: req.body.description,
      price: req.body.price,
    };
    serviceModel.create({
      idBaberie: info.idBaberie,
      description: info.description,
      price: info.price
    }, function(err, result) {
      console.log('create', err, result);
      if (err) {
        res.json({
          state: 'error',
          message: 'No pudimos crear tu servicio, intentalo nuevamente.'
        })
        next(err)
      } else {
        res.json({
          state: 'success',
          message: 'Servicio creado exitosamente'
        })
      }
    });
  },
  findAll: function(req, res, next) {
    console.log(req.query);
    serviceModel.find({}, function(err, services) {
      res.json(services);
    })
  }
};

module.exports = serviceController;
