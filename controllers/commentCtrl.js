//Require Mongoose
var mongoose = require('mongoose');
var commentModel = require('../models/commentModel');
var userModel = require('../models/userModel');
var jwt = require('jsonwebtoken');

var commentController = {
  create: function(req, res, next) {
    console.log('create', req.body);
    var info = {};
    info = {
      comment: req.body.comment,
      creationDate: new Date(),
      //idBarberie: mongoose.Types.ObjectId(req.body.idBarberie),
      idBarber: mongoose.Types.ObjectId(req.body.idBarber),
      idUser: mongoose.Types.ObjectId(req.body.idUser),
      rate: req.body.rate,
    };
    commentModel.create({
      comment: info.comment,
      creationDate: info.creationDate,
      //idBarberie: info.idBarberie,
      idBarber: info.idBarber,
      idUser: info.idUser,
      rate: info.rate
    }, function(err, result) {
      console.log('create', err, result);
      if (err) {
        res.json({
          state: 'error',
          message: 'No pudimos crear tu comentario, intentalo nuevamente.'
        })
        next(err)
      } else {
        res.json({
          state: 'success',
          message: 'Comentario creado exitosamente'
        })
      }
    });
  },
  findByBarber: function(req, res, next) {
    console.log(req.query);
    commentModel.find({
      idBaber : req.query.idBarber
    }, function(err, comments) {
      console.log(comments);
      var i = 0;
      for (i; i < comments.length; i++) {
        comments[i].user = {};
        console.log(comments[i].user);
        //comments[i].user = getNameUSer(comments[i]);
        //console.log('line 55', getNameUSer(comments[i]));
        if(i == comments.length-1){
          res.json(comments);
        }
      }
    }).populate({path: 'idUser', select:"name lastname"})
  }
};

function getNameUSer(comment) {
  userModel.findOne({
    _id: comment.idUser
  }, function(err, user) {
    console.log(user);
    return user;
  }).select('name lastname');
}

module.exports = commentController;
