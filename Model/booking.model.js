const mongoose = require('mongoose');

//simple schema
const bookingSchema = new mongoose.Schema({
  stay: {
    type: String,
  },
  trip_type: {
    type: String,
  },
  fare:{
    type: String,
  },
  baggeg:{
    type: Boolean,
  },
  meal:{
    type: Boolean,
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  flight:{ type: mongoose.Schema.Types.ObjectId, ref: 'Flight' },
  seat:{ type: mongoose.Schema.Types.ObjectId, ref: 'Seat' },
  overseas_emergency_medical_assistance:{
    type: Boolean,
  },
  accommodation_and_travel_expenses:{
    type: Boolean,
  },
  hospital_cash_allowance:{
    type: Boolean,
  },
  status:{
    type:String
  }
});


const booking = mongoose.model('Booking', bookingSchema);
exports.Booking = booking; 
