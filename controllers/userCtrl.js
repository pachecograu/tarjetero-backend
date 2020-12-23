var userModel = require('../models/userModel');
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

var userController = {
  authenticate: function (req, res, next) {
    console.log('authenticate', req.body);
    userModel.findOne({
      email: req.body.user
    }, function (err, user) {
      console.log('authenticate', err, user);
      if (user) {
        console.log('authenticate', user);
        if (user.password == encrypt(req.body.password)) {
          var token = jwt.sign({
            id: user._id
          }, req.app.get('secretKey'), {
            expiresIn: '876000h'
          });
          res.json({
            status: 'success',
            message: 'Bienvenido',
            user: {
              "_id": user._id,
              "name": user.name,
              "lastname": user.lastname,
              "birthdate": user.birthdate,
              "phone": user.phone,
              "email": user.email,
              "photo": user.photo,
              "creationDate": user.creationDate
            },
            token: token
          });
        }else{
          exepciones(res, 400, 'Usuario o contraseña invalida');
        }
      }
      if (err) {
        exepciones(res, 500, err);
      } else if (!user) {
        exepciones(res, 400, 'Usuario o contraseña invalida');
      }
    });
  },
  create: function (req, res, next) {
    console.log('create', req.body);

    if (!req.body.name) {
      exepciones(res, 400, 'El nombre es obligatorio');
      return;
    } else if (!req.body.birthdate) {
      exepciones(res, 400, 'La fecha de nacimiento es obligatoria');
      return;
    } else if (!req.body.email) {
      exepciones(res, 400, 'El correo electronico es obligatorio');
      return;
    } else if (!req.body.phone) {
      exepciones(res, 400, 'El numero de celular es obligatorio');
      return;
    } else if (!req.body.password) {
      exepciones(res, 400, 'La contraseña es obligatoria');
      return;
    } else {

      userModel.findOne({
        email: req.body.email
      }, function (err, user) {
        console.log('create', err, user);
        if (!user) {
          info = {
            name: req.body.name,
            lastname: req.body.lastname || 'Anonimo',
            birthdate: new Date(),
            phone: req.body.phone,
            email: req.body.email,
            photo: req.body.photo || '',
            password: encrypt(req.body.password)
          };
          userModel.create({
            name: info.name,
            lastname: info.lastname,
            birthdate: info.birthdate,
            phone: info.phone,
            email: info.email,
            photo: info.photo,
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

module.exports = userController;