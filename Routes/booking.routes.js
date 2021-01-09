var express = require('express');
var BookingRouter = express.Router();
var BookingController = require('../Controller/booking.controller');

BookingRouter.get('/',BookingController.test);

BookingRouter.post('/book',BookingController.createBooking);

BookingRouter.get('/:bookingId',BookingController.getBookingbyId);

BookingRouter.get('/get/all',BookingController.getAllbookings);

BookingRouter.post('/confirm/:bookingId',BookingController.confrimBooking);

BookingRouter.post('/reject/:bookingId',BookingController.rejectBooking);

module.exports = BookingRouter;