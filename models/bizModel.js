//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var SchemaBiz = mongoose.Schema;

var BizModelSchema = new SchemaBiz({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  profession: {
    type: String
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
  contacts: [{
    tipo: Number,
    value: String
  }],
  web: {
    type: String
  },
  networks: [{
    tipo: Number,
    value: String
  }],
  photoprofile: {
    type: String
  },
  photos: [{
    value: String
  }],
  address: {
    value: String,
    map: {
      lat: String,
      lng: String
    }
  },
  schedule: [{
    from: {
      day: Number,
      hour: Date,
    },
    to: {
      day: Number,
      hour: Date,
    }
  }],
  creationDate: {
    type: Date,
    default: Date.now
  },
  idCategory: [{
    type: SchemaBiz.Types.ObjectId,
    ref: 'categories'
  }]
}, {
  usePushEach: true
});

module.exports = mongoose.model('bizs', BizModelSchema);
