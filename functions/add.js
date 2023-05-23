const db = require('../schemas');

// προσθέτει στην βάση έναν admin
let addnewadmin = async function(req,res){
    console.log(req.query);

    const newAdmin = new db.admins({
        fname: req.query.fname,
        lname: req.query.lname,
        email: req.query.email,
        username: req.query.username,  
        password: req.query.password
    });

    await newAdmin.save()
    res.redirect('/back/admins/admins.html');
}
//

// προσθέτει στην βάση μία κράτηση
let addnewbooking = async function(req,res){
    console.log(req.query);
    const car = await db.cars.findOne({license_plate:req.query.license_plate})
    const lastbooking = await db.bookings.findOne({}).sort({id: -1});
    console.log(car);
    
    const newBooking = new db.bookings({
        id:  lastbooking.id+1,
        car_id: car.id,
        start_date: new Date().toLocaleDateString(),
        finish_date: dateFormat(req.query.finish_date),
        driver: req.query.name,
        drivers_license: req.query.drivers_license,
        insurance: getInsurance(req.query.insurance)[0],
        status:"Ενεργή",
        price: getDateDiff(req.query.finish_date, new Date())*car.price_day + getInsurance(req.query.insurance)[1]
    });
    await db.cars.updateOne({ id: car.id }, {state: "Νοικιασμένο" })
 

    await newBooking.save()
    res.redirect('/back/bookings/bookings.html');
}
//

// προσθέτει στην βάση ένα αυτοκίνητο
let addnewcar = async function(req,res){
    const cars = await db.cars.find({})
    const lastcar = await db.cars.findOne({}).sort({id: -1});

    const newCar = new db.cars({
        id: lastcar.id+1,
        license_plate: req.query.license_plate,
        brand: req.query.brand,
        model: req.query.model,
        fuel: req.query.fuel,
        price_day: req.query.price_day,
        state:"Ελεύθερο"
    })

    await newCar.save();
    res.redirect('/back/cars/cars.html');
}
//

// αλλάζει το format της ημερομηνίας από dd/mm/yyyy σε yyyy-mm-dd και αντίστροφα
function dateFormat(date){
    if (date.split('/').length === 1){
        const [year, month, day] = date.split('-');
        return `${day}/${month}/${year}`
    }
    if (date.split('-').length === 1){
        const [day, month, year] = date.split('/');
        return `${year}-${month}-${day}`
    } 
}
//

// βρίσκει την διαφορά σε μέρες 2 ημερών
function getDateDiff(date2, date1){
    return parseInt(Math.ceil((new Date(date2) - new Date(date1)) / 86400000));
}
//

// Βρίσκει την ασφάλεια που έχει επιλέξει ο χρήστης, στα ελληνικά .. το 1 στοιχείο που επιστρέφει είναι η χρέωση της ασφάλειας
function getInsurance(insurance){
    if (insurance === "full") return ["Πλήρης", 100]
    if (insurance === "partial") return ["Μερική", 50]
    return ["Καμία", 0]
}
//

module.exports = {addnewadmin, addnewbooking, addnewcar, dateFormat, getDateDiff, getInsurance};
