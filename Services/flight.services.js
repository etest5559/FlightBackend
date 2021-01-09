var {Flight} = require('../Model/flight.model');
var {Seat} = require('../Model/seats.model');

exports.findFlight = async (query) => {
    
    const flight = Flight.findOne(query)
    .populate('business_class_seats')
    .populate('first_class_seats')
    .populate('economy_class_seats');;
    return flight;

};

exports.findFlights = async (query) => {
    
    const flight = Flight.find(query)
    .populate('business_class_seats')
    .populate('first_class_seats')
    .populate('economy_class_seats');


    return flight;

};

exports.findAllFlight = async () => {
    
    const flight = Flight.find()
    .populate('business_class_seats')
    .populate('first_class_seats')
    .populate('economy_class_seats');
    return flight;

};

exports.createFlight = async (query) => {
    
    const flight = new Flight(query);
    console.log(flight);
    return await flight.save();

};

exports.createSeat = async (query) => {
    
    const seat = new Seat(query);
    console.log(seat);
    return await seat.save();

};

exports.findSeatById = async (query) => {
    
    const seat = Seat.findById(query);
    return seat;

};

exports.findFlightById = async (query) => {
    
    const flight = Flight.findById(query)
    .populate('business_class_seats')
    .populate('first_class_seats')
    .populate('economy_class_seats');
    return flight;

};

exports.deleteFlight = async (query) => { 
    const flight = Flight.deleteOne(query);
    return flight;
}

exports.updateFlight = async (query,update) => {
    const updateFLight = Flight.findOneAndUpdate(query,update,{
        new: true,
        upsert: true,
    });
    return updateFLight;
}



