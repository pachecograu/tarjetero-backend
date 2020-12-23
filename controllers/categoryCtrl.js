var categoryModel = require('../models/categoryModel');
var exepciones = require('./exepciones');

var categoryController = {
  create: function (req, res, next) {
    console.log('create', req.body);

    if (!req.body.name) {
      exepciones(res, 400, 'El nombre es obligatorio');
      return;
    } else {

      info = {
        name: req.body.name,
        description: req.body.description
      };
      categoryModel.create({
        name: info.name,
        description: info.description
      }, function (err, result) {
        console.log('create', err, result);
        if (result) {
          res.json({
            state: 'success',
            message: 'Creado exitosamente',
            res: result
          })
        }
        if (err) {
          exepciones(res, 500, err);
        } else if (!result) {
          exepciones(res, 500, 'Ha ocurrido un problema, comuniquese con el administrador');
        }
      });
    }
  },
  findAll: function (req, res, next) {
    // console.log(req);
    categoryModel.find({
    }, function (err, cats) {
      if (cats) {
        res.json(cats);
      }
      if (err) {
        exepciones(res, 500, err);
      } else if (!cats) {
        exepciones(res, 404, 'No existen resultados');
      }
    })
  },
  findById: function (req, res, next) {
    console.log(req.query);
    if (!req.query.id) {
      exepciones(res, 400, 'El id es obligatorio');
      return;
    }
    categoryModel.findOne({
      _id: req.query.id
    }, function (err, biz) {
      if (biz) {
        res.json(biz);
      }
      if (err) {
        exepciones(res, 500, err);
      } else if (!biz) {
        exepciones(res, 400, 'Usuario no existe');
      }
    })
  },
  updateById: function (req, res, next) {
    // console.log(req.body);
    if (!req.body.id) {
      exepciones(res, 400, 'El id es obligatorio');
      return;
    }
    var info = {
      // name: null,
      // lastname: null,
      // birthdate: null,
      // phone: null,
      // photo: null
    };
    for (const key in req.body) {
      info[key] = req.body[key];
    }
    categoryModel.findOne({
      _id: req.body.id
    }, function (err, biz) {
      if (biz) {
        biz.set(info);
        biz.save(function (err, updatedBiz) {
          console.log(err, updatedBiz);
          if (updatedBiz) {
            res.json({
              respon: 'Usuario actualizado exitosamente!.'
            });
          }
          if (err) {
            exepciones(res, 500, err);
          } else if (!updatedBiz) {
            exepciones(res, 400, 'Usuario no existe');
          }
        });
      }
      if (err) {
        exepciones(res, 500, err);
      } else if (!biz) {
        exepciones(res, 400, 'Usuario no existe');
      }
    })
  },
  deleteById: function (req, res, next) {
    // console.log(req.body);
    if (!req.body.id) {
      exepciones(res, 400, 'El id es obligatorio');
      return;
    }
    categoryModel.deleteOne({
      _id: req.body.id
    }, function (err, deletedBiz) {
      console.log(err, deletedBiz);
      if (deletedBiz) {
        res.json({
          message: 'Usuario eliminado exitosamente'
        });
      }
      if (err) {
        exepciones(res, 500, err);
      } else if (!deletedBiz) {
        exepciones(res, 400, 'Usuario no existe');
      }
    });
  }
};

module.exports = categoryController;