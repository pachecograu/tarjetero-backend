//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var SchemaUsers = mongoose.Schema;

var UsersModelSchema = new SchemaUsers({
  id: SchemaUsers.Types.ObjectId,
  name: {
    type: String,
    required: true
  },
  lastname: {
    type: String
  },
  birthdate: {
    type: Date,
    required: true
  },
  phone: {
    type: String,
    index: true,
    unique: true,
    required: true
  },
  email: {
    type: String,
    index: true,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  photo: String,
  creationDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('users', UsersModelSchema);