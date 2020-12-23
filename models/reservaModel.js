//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var SchemaReserva = mongoose.Schema;

var ReservasModelSchema = new SchemaReserva({
  creationDate: {
    type: Date,
    default: Date.now
  },
  idBarberie: SchemaReserva.Types.ObjectId,
  idUser: SchemaReserva.Types.ObjectId,
  idBarber: SchemaReserva.Types.ObjectId,
  reservaDate: Date,
  services: [{
      id: SchemaReserva.Types.ObjectId
    }],
  state: {
    type: String,
    default: 'pending',
    requerid: true
  }
});

module.exports = mongoose.model('reservas', ReservasModelSchema);
