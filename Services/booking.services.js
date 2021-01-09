var {Booking} = require('../Model/booking.model');

exports.createBooking =  async (query)=>{
    
    const booking = new Booking(query);
    console.log("Booking",booking);
    return booking.save();
}

exports.getBookingbyId = async (query) => {
    const bookings = Booking.findById(query)
        .populate('user')
        .populate('flight')
        .populate('seat');
        return bookings;
    
  }
  
  exports.getAllbookings = async ()=> {
        
    const bookings = Booking.find()
        .populate('user')
        .populate('flight')
        .populate('seat');
    return bookings;
  } 

exports.updateBooking = async (query,update) => {
    const updateBooking = Booking.findOneAndUpdate(query,update,{
        new: true,
        upsert: true,
    });
    return updateBooking;
}