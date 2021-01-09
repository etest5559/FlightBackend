const mongoose = require('mongoose');

//simple schema
const seatSchema = new mongoose.Schema({
  no: {
    type: String,
    required: true,
    maxlength: 550
  },
  fare: {
    type: Number 
  },
  status:{
    type:String
  }

});


const seat = mongoose.model('Seat', seatSchema);
exports.Seat = seat; 
