var express = require('express');
var FlightRouter = express.Router();
var FLightController = require('../Controller/flight.controller');

FlightRouter.get('/',FLightController.test);

FlightRouter.post('/createFlight',FLightController.createFlight);

FlightRouter.get('/:FlightID',FLightController.getFlightbyId);

FlightRouter.get('/get/all',FLightController.getAllFlights);

FlightRouter.put('/:FlightID',FLightController.updateFlightbyId)

FlightRouter.delete('/:FlightID', FLightController.deleteFlightbyId)




module.exports = FlightRouter;