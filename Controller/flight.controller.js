var FlightService = require('../Services/flight.services');

exports.test = async (req,res ) => {
  res.status(200).json({
    message:"Service Working"
  });
}

exports.createFlight = async (req,res)=>{
  
  let flight = await FlightService.findFlight({flight_no: req.body.flight_no})
  
  console.log("flight",flight,req.body);
  
  if (flight) return res.status(400).send("Flight already registered.");
  
  let economySeats=[];
  let businessSeats=[];
  let firstSeats=[];

  async function createSeats(){
    console.log(req.body.businessSeats.from);
    console.log(req.body.firstSeats.from);
    console.log(req.body.economySeats.from);
    for(var i=req.body.businessSeats.from;i<=req.body.businessSeats.to;i++){
      console.log("inside loop businessSeats");
      let seat = await FlightService.createSeat({no:i,fare:req.body.businessSeats.fare,status:"Available"})
      businessSeats.push(seat._id)
    }
  
    for(var i=req.body.firstSeats.from;i<=req.body.firstSeats.to;i++){
      console.log("inside loop firstSeats");
      let seat = await FlightService.createSeat({no:i,fare:req.body.firstSeats.fare,status:"Available"});
      firstSeats.push(seat._id)
    }
  
    for(var i=req.body.economySeats.from;i<=req.body.economySeats.to;i++){
      console.log("inside loop economySeats");
      let seat = await FlightService.createSeat({no:i,fare:req.body.economySeats.fare,status:"Available"})
      economySeats.push(seat._id);
    }
  }

  await createSeats();

  let flightdata = {
    picture: req.body.picture,
    flight_no: req.body.flight_no,
    departure: req.body.departure,
    destination:req.body.destination,
    departure_date:req.body.departure_date,
    departure_time:req.body.departure_time,
    duration:req.body.duration,
    total_seats:req.body.total_seats,
    business_class_seats:businessSeats,
    economy_class_seats:economySeats,
    first_class_seats:firstSeats,
    bookingcount:0
}

console.log(flightdata);

  flight = await FlightService.createFlight(flightdata);
  
  res.status(200).json({
      _id: flight._id,
      flight_no: flight.flight_no,
      flightdata:flightdata,
      message:"flight created Success"
  });
}


exports.getFlightbyId = async (req,res) => {
  const {FlightID} = req.params;
  const flight = await FlightService.findFlightById(FlightID)
  res.status(200).json({
    flightdata:flight,
    message:"Flight fetched Success"
});

}

exports.getAllFlights = async (req,res)=> {

  const flights = await FlightService.findAllFlight();
  console.log("flight",flights);
  res.status(200).json({
    flightdata:flights,
    message:"flights fetched Success"
});

}

exports.deleteFlightbyId = async (req,res) => {
  const {FlightID} = req.params;
  const flight = await FlightService.deleteFlight({_id:FlightID});
  res.status(200).json({
    flightdata:flight,
    message:"Flight Deleted Success"
});

}


exports.updateFlightbyId = async (req,res) => {
  const {FlightID} = req.params;
  const flight = await FlightService.updateFlight({_id:FlightID},req.body.update)
  res.status(200).json({
    flightdata:flight,
    message:"Flight fetched Success"
});

}

