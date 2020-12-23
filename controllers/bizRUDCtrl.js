var bizModel = require('../models/bizModel');
var exepciones = require('./exepciones');

var bizRUDController = {
  findAll: function (req, res, next) {
    // console.log(req);
    bizModel.find({}, '-password').populate({
        path: 'idCategory',
        select: 'name'
      })
      .exec(function (err, bizs) {
        console.log('exec', bizs);
        if (bizs) {
          res.json(bizs);
        }
        if (err) {
          exepciones(res, 500, err);
        } else if (!bizs) {
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
    bizModel.findOne({
        _id: req.query.id
      }, '-password').populate({
        path: 'idCategory',
        select: 'name'
      })
      .exec(function (err, biz) {
        console.log('exec', biz);
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
    console.log(req.body);
    if (!req.body._id) {
      exepciones(res, 400, 'El id es obligatorio');
      return;
    }
    bizModel.findOne({
      _id: req.body._id
    }, '-password', function (err, biz) {
      if (biz) {
        buildBizData(req.body, biz, function (biz) {
          console.log(biz);
          // biz.set(data);
          biz.save(function (err, updatedBiz) {
            console.log(err, updatedBiz);
            if (updatedBiz) {
              res.json({
                message: 'Usuario actualizado exitosamente!.',
                data: updatedBiz
              });
            }
            if (err) {
              exepciones(res, 500, err);
            } else if (!updatedBiz) {
              exepciones(res, 400, 'Usuario no existe');
            }
          });
        });
      }
      if (err) {
        exepciones(res, 500, err);
      } else if (!biz) {
        exepciones(res, 400, 'Usuario no existe');
      }
    });
  },
  deleteById: function (req, res, next) {
    // console.log(req.body);
    if (!req.body.id) {
      exepciones(res, 400, 'El id es obligatorio');
      return;
    }
    bizModel.deleteOne({
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

function buildBizData(body, biz, fn) {
  console.log(body, biz);
  for (const key in body) {
    if (key != 'creationDate') {
      biz[key] = body[key];
      if (key == 'idCategory') {
        var idCat = [];
        body[key].forEach(_id => {
          idCat.push(_id);
        });
        biz[key] = idCat;
      }
    }
  }
  fn(biz);
}

module.exports = bizRUDController;