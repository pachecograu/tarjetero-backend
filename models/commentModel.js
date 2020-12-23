//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var SchemaComment = mongoose.Schema;

var CommentsModelSchema = new SchemaComment({
  comment: {
    type: String,
    required: true
  },
  creationDate: {
    type: Date,
    default: Date.now
  },
  idBarberie: SchemaComment.Types.ObjectId,
  idUser: SchemaComment.Types.ObjectId,
  idBarber: SchemaComment.Types.ObjectId,
  rate: {
    type: SchemaComment.Types.Decimal128,
    default: 0.0
  },
});

module.exports = mongoose.model('comments', CommentsModelSchema);
