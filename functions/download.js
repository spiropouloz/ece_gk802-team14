const db = require('../schemas');
const path = require('path');
const fs = require('fs');

// κατεβάζει το collection admins από την βάση
async function download_admins(req,res,next){
    const admins = await db.admins.find({}).sort({id:1})
    .then((admin) => {
        fs.writeFileSync(path.join(__dirname,'../back','admins','admins.json'), JSON.stringify(admin), {encoding: "utf8", flag:'w+'})
    })
    .catch((error) => {
        console.log(error);
    });
    next();
}
//

// κατεβάζει το collection bookings από την βάση
async function download_bookings(req,res,next){
    const bookings = await db.bookings.find({}).sort({id:1})
    .then((booking) => {
        fs.writeFileSync(path.join(__dirname,'../back','bookings','bookings.json'), JSON.stringify(booking), {encoding: "utf8", flag:'w+'})
    })
    .catch((error) => {
        console.log(error);
    });
    next();
}
//

// κατεβάζει το collection cars από την βάση
async function download_cars(req,res,next){
    const cars = await db.cars.find({}).sort({id:1})
    .then((car) => {
        fs.writeFileSync(path.join(__dirname,'../back','cars','cars.json'), JSON.stringify(car), {encoding: "utf8", flag:'w+'})
    })
    .catch((error) => {
        console.log(error);
    });
    next();
}
//

module.exports = {download_admins, download_bookings, download_cars};