const mongoose = require('mongoose');

//simple schema
const FlightSchema = new mongoose.Schema({
  flight_no:{
    type:String
  },
  picture: {
    type: String,
  },
  departure: {
    type: String,
  },
  destination: {
    type: String,
  },
  departure_date:{
    type:Date
  },
  departure_time:{
    type:String
  },
  duration:{
    type:String
  },
  total_seats:{
    type:Number
  },
  bookingcount:{
    type:Number,
    default:0
  },
  business_class_seats:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Seat' }],
  economy_class_seats:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Seat' }],
  first_class_seats:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Seat' }]
});


const flight = mongoose.model('Flight', FlightSchema);
exports.Flight = flight; 
