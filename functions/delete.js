const db = require('../schemas');

// διαγράφει από την βάση τον admin
let deleteadmin = async function(req,res){  
    await db.admins.deleteOne({ _id: req.query.id }) 
    res.redirect('/back/admins/admins.html');
}
//

// διαγράφει από την βάση το αυτοκίνητο
let deletecar = async function(req,res){
    await db.cars.deleteOne({ id: req.query.id }) 
    res.redirect('/back/cars/cars.html');
}
//

module.exports = {deleteadmin, deletecar};