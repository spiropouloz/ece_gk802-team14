const db = require('../schemas');
const {dateFormat, getDateDiff, getInsurance} = require('./add.js');

// Εμφανίζει όλα τα ελεύθερα και προς ενοικίαση αυτοκίνητα
let search = async function(req, res){
    console.log(req.query);
    const lastbooking = await db.bookings.findOne({}).sort({id: -1});
    let available_cars = await db.cars.find({state:"Ελεύθερο"}).sort({id: 1}).lean()
    available_cars = available_cars.map((car) => {
        return { ...car, price_total: getDateDiff(req.query.return_date, req.query.pickup_date)*car.price_day};
      });
      console.log(available_cars)
    res.render('results' , {car: available_cars, display:"none", title: "Search Car", cssfile:'/results/views/results.css'});
}
//

// βρίσκει πιο _id είναι 'on' (δηλαδή checked)
function findID(response, targetValue){
    let targetKey = null;

    for (var key in response) {
        if (response[key] === targetValue) {
            targetKey = key;
            break;
        }
    }
    return targetKey;
}
//

// Βάζει στην βάση την καινούρια κράτηση
let selectCar = async function(req, res, next){
    const car = await db.cars.findOne({_id: findID(req.query, 'on')})
    const lastbooking = await db.bookings.findOne({}).sort({id: -1});

    console.log(car);

    const urlParams = new URLSearchParams(req.headers.referer);

    const newBooking = new db.bookings({
        id:  lastbooking.id+1,
        car_id: car.id,
        start_date: dateFormat(urlParams.get("pickup_date")),
        finish_date: dateFormat(urlParams.get("return_date")),
        driver: [req.query.fname, req.query.lname].join(' '),
        drivers_license: req.query.drivers_license,
        insurance: getInsurance(req.query.insurance)[0],
        status:"Ενεργή",
        price: getDateDiff(urlParams.get("return_date"),urlParams.get("pickup_date"))*car.price_day + getInsurance(req.query.insurance)[1]
    });
    await db.cars.updateOne({ _id: car["_id"] }, {state: "Νοικιασμένο" })
 
    console.log(newBooking);

    let available_cars = await db.cars.find({state:"Ελεύθερο"}).sort({id: 1}).lean()
    await newBooking.save()
    res.render('results' , {car: available_cars, display:"block", title: "Search Car", cssfile:'/results/views/results.css' });
}
//

module.exports = {search, selectCar};