const db = require('../schemas');

let changestate = async function (req, res){
    console.log(req.query)
    await db.bookings.updateOne({ id: req.query.id }, {status: "Ακυρωμένη" })
    await db.cars.updateOne({ license_plate: req.query.lp }, {state: "Ελεύθερο" })
    res.redirect('/back/bookings/bookings.html')
}

module.exports = changestate;