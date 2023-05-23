const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const { exec } = require('child_process');


// Εκκίνηση του server
const port = '3000';
const app = express();
const router = express.Router();
app.use(router); 
app.listen(port, () => console.log(`Listening to port ${port}`));
app.use(express.static(path.join(__dirname)))

app.get('/',(req, res) => {res.sendFile(path.join(__dirname, '/main/index.html'))});

// exec(`start chrome http://127.0.0.1:${port}`);
//


// Handlebars
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'results' ,'views'));

app.engine('hbs',exphbs.engine({extname: '.hbs', defaultLayout: 'main', layoutsDir: __dirname + '/results/views/layouts', }));
//


// Σύνδεση με MongoDB Atlas
// const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://marios:test@cluster0.1ooobbs.mongodb.net/Avis?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB Atlas');
}).catch((error) => {
    console.error('Error connecting to MongoDB Atlas', error);
});
//


// Εισαγωγή όλων των callback functions
const {search, selectCar} = require('./functions/search.js')
const {loginsubmit} = require('./functions/login.js')
const {addnewadmin, addnewbooking, addnewcar} = require('./functions/add.js')
const {deleteadmin, deletecar} = require('./functions/delete.js')
const {download_admins, download_bookings, download_cars} = require('./functions/download.js')
//

// Routing
router.route('/search').get(search);
router.route('/selectcar').get(selectCar);

router.route('/loginsubmit').get(loginsubmit);
app.get('/login', (req, res)=>{res.render('../../login/login' , {display:"none", title: "Login Form", cssfile:'login.css' });})

router.route('/addAdmin').get(addnewadmin);
router.route('/addBooking').get(addnewbooking);
router.route('/addCar').get(addnewcar);

router.route('/deleteAdmin').get(deleteadmin);
router.route('/deleteCar').get(deletecar);

router.route('/back/admins/admins.html').get(download_admins);
router.route('/back/bookings/bookings.html').get(download_bookings);
router.route('/back/cars/cars.html').get(download_cars);
//