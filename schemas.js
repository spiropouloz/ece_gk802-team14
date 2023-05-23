const mongoose = require('mongoose')
const schema = mongoose.Schema;

// Περιγράφουμε ουσιαστικά την μορφή του κάθε collection στην Βάση Δεδομένων μας
const adminSchema = new schema({
    fname: String,
    lname: String,
    email: String,
    username: String,
    password: String
});

const carSchema = new schema({
    id: Number,
    license_plate: String,
    brand: String,
    model: String,
    fuel: String,
    price_day: Number,
    state: String
})

const bookingSchema = new schema({
    id: Number,
    car_id: Number,
    start_date: String,
    finish_date: String,
    driver: String,
    drivers_license: Number,
    insurance: String,
    status: String,
    price: Number
})


const cars = mongoose.model("cars", carSchema, "cars")
const bookings = mongoose.model("bookings", bookingSchema, "bookings")
const admins = mongoose.model("admins", adminSchema, "admins")

// εξάγουμε τα model κάθε collection σε άλλα αρχεία
module.exports.cars = cars;
module.exports.bookings = bookings;
module.exports.admins = admins;