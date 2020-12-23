//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var SchemaCategory = mongoose.Schema;

var CategorysModelSchema = new SchemaCategory({
  creationDate: {
    type: Date,
    default: Date.now
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  }
});

module.exports = mongoose.model('categories', CategorysModelSchema);
