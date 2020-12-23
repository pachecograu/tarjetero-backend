var bizModel = require('../models/bizModel');
var jwt = require('jsonwebtoken');
var exepciones = require('./exepciones');

const crypto = require('crypto');

function encrypt(pass) {
  const secret = 'MatthewPachecoLozano';
  const hash = crypto.createHmac('sha256', secret)
    .update(pass)
    .digest('hex');
  return hash;
}

var bizController = {
  authenticate: function (req, res, next) {
    console.log('authenticate', req.body);
    bizModel.findOne({
        email: req.body.user
      }).populate({
        path: 'idCategory',
        select: 'name'
      })
      .exec(function (err, biz) {
        console.log('authenticate', err, biz);
        if (biz) {
          console.log('authenticate', biz);
          if (biz.password == encrypt(req.body.password)) {
            var token = jwt.sign({
              id: biz._id
            }, req.app.get('secretKey'), {
              expiresIn: '876000h'
            });
            res.json({
              status: 'success',
              message: 'Bienvenido',
              user: {
                "_id": biz._id,
                "name": biz.name,
                "description": biz.description,
                "profession": biz.profession,
                "phone": biz.phone,
                "email": biz.email,
                "photoprofile": biz.photoprofile,
                "photos": biz.photos,
                "contacts": biz.contacts,
                "web": biz.web,
                "networks": biz.networks,
                "address": biz.address,
                "schedule": biz.schedule,
                "idCategory": biz.idCategory,
                "creationDate": biz.creationDate
              },
              token: token
            });
          } else {
            exepciones(res, 400, 'Usuario o contraseña invalida');
          }
        }
        if (err) {
          exepciones(res, 500, err);
        } else if (!biz) {
          exepciones(res, 400, 'Usuario o contraseña invalida');
        }
      });
  },
  create: function (req, res, next) {
    console.log('create', req.body);

    if (!req.body.name) {
      exepciones(res, 400, 'El nombre es obligatorio');
      return;
    } else if (!req.body.email) {
      exepciones(res, 400, 'El correo electronico es obligatorio');
      return;
    } else if (!req.body.password) {
      exepciones(res, 400, 'La contraseña es obligatoria');
      return;
    } else {

      bizModel.findOne({
        email: req.body.email
      }, function (err, biz) {
        console.log('create', err, biz);
        if (!biz) {
          info = {
            name: req.body.name,
            email: req.body.email,
            password: encrypt(req.body.password)
          };
          bizModel.create({
            name: info.name,
            email: info.email,
            password: info.password
          }, function (err, result) {
            console.log('create', err, result);
            if (result) {
              res.json({
                state: 'success',
                message: 'Creado exitosamente'
              })
            }
            if (err) {
              exepciones(res, 500, err);
            } else if (!result) {
              exepciones(res, 500, 'Ha ocurrido un problema, comuniquese con el administrador');
            }
          })
        } else {
          exepciones(res, 500, 'Este usuario ya existe');
        }
      });
    }
  }
};

module.exports = bizController;