//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var SchemaService = mongoose.Schema;

var ServicesModelSchema = new SchemaService({
  idBiz: SchemaService.Types.ObjectId,
  creationDate: {
    type: Date,
    default: Date.now
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('services', ServicesModelSchema);
