const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./configs/db');
const usercontroller = require('./controller/usercont');
const app = express();
app.use(express.json());
//mongoose config
mongoose.connect(config.database);
mongoose.connection.on('connected', ()=>{
    console.log('connected to ' + config.database);
});

mongoose.connection.on('error', (err)=>{
    console.log('Db error ' + err);
});





//CORS Middle ware
app.use(cors());
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
require('./configs/passport')(passport);

app.use(express.static(path.join(__dirname, 'public')));
app.use('/users', usercontroller);
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded())

const port = process.env.PORT || 4000;
//index route
app.get('/', (req, res) => {
    res.send('hello from express');
});

app.listen(port, ()=> {
    console.log('app is listenning at ' + port);
});