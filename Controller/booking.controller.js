const { Booking } = require('../Model/booking.model');
const { Flight } = require('../Model/flight.model');
var BookingService = require('../Services/booking.services');
var FlightService = require('../Services/flight.services');
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'etest5559@gmail.com',
    pass: '12345Test12345,]@'
  }
});

exports.test = async (req,res ) => {
  res.status(200).json({
    message:"Service Working"
  });
}


exports.createBooking = async (req,res) => {
  
  const bookingdata = {
    stay: req.body.stay,
    trip_type:req.body.trip_type,
    fare:req.body.fare,
    baggeg:req.body.baggeg,
    meal:req.body.meal,
    user:req.body.user,
    flight:req.body.flight,
    seat:req.body.seat,
    status:"Created"
  }

  let booking = await BookingService.createBooking(bookingdata);

  if(booking){
    var flight = await FlightService.findFlightById(req.body.flight);
    var seat = await FlightService.findSeatById(req.body.seat);

    flight.bookingcount++;
    flight.save();

    seat.status="Booked";
    seat.save();

  }

  res.status(200).json({
    bookingdata:booking,
    message:"booking created Success"
});

}

exports.getBookingbyId = async (req,res) => {
  const {bookingId} = req.params;
  const booking = await BookingService.getBookingbyId(bookingId);
  res.status(200).json({
    bookingdata:booking,
    message:"booking fetched Success"
});

}

exports.getAllbookings = async (req,res)=> {

  const bookings = await BookingService.getAllbookings();
  console.log("bookings",bookings);
  res.status(200).json({
    bookingdata:bookings,
    message:"bookings fetched Success"
});

}

exports.confrimBooking = async (req,res) => {
  const {bookingId} = req.params;
  const booking = await BookingService.getBookingbyId(bookingId);
  if(booking){
    if(booking.user.email){
      booking.status="Approved";
      await booking.save();
      var mailOptions = { 
        from: 'etest5559@gmail.com', 
        to: booking.user.email, 
        subject: 'Booking Status Approve', 
        text: 'Hello,\n\n' + 'Your Booking has been Approve by the Admin for Flight:'+booking.flight.flight_no
      }

      transporter.sendMail(mailOptions, function (err) {
        if (err){ 
          res.status(404).json({error:err});
        }else{
          res.status(200).json({message:"email sent success"})
        }
        
      });

    } else {
      res.status(400).json({
        message:"user email not found can not send email"
      });
    }
  } else {
    res.status(400).json({
      message:"bookings not found"
    });
  }

}

exports.rejectBooking = async (req,res) => {
  const {bookingId} = req.params;
  const booking = await BookingService.getBookingbyId(bookingId);
  if(booking){
      if(booking.user.email){
        booking.status="Rejected"
        booking.save();
        var mailOptions = { 
          from: 'etest5559@gmail.com', 
          to: booking.user.email, 
          subject: 'Booking Status Rejected', 
          text: 'Hello,\n\n' + 'Your Booking has been Rejected by the Admin for Flight:'+booking.flight.flight_no
        }

        transporter.sendMail(mailOptions, function (err) {
          if (err){ 
            res.status(404).json({error:err});
          }else{
            res.status(200).json({message:"email sent success"})
          }
          
        });
      } else {
        res.status(400).json({
          message:"user email not found can not send email"
        });
      }


  } else {
    res.status(400).json({
      message:"bookings not found"
    });
  }
}