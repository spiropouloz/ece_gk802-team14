const db = require('../schemas');

// Ελέγχει αν τα διαπιστευτήρια που εισήγαγε ο χρήστης αντιστοιχούν σε κάποιον διαχειριστή στην βάση.
let loginsubmit = async function(req,res) {
    const admins = await db.admins.find({$and:[{username:req.query.username},{password:req.query.password}]})
    .then((admin) => {
        console.log(admin);
        if (admin.length === 0){
            res.render('../../login/login' , {display:"block", title: "Login Form", cssfile:'../../login/login.css' });
        }
        else{
            res.redirect('/back/home/home.html');
        }
    })
    .catch((error) => {
        res.send('<script>alert("ERROR - TRY AGAIN")</script>');
    });
}
//

module.exports = {loginsubmit};