// MODULES
var express = require('express')
var path = require('path');
var ejsMate = require('ejs-mate');
var mysql  = require('mysql');
var bodyParser = require("body-parser");
var session = require('express-session');
var mysqlConneciton = require('./connection');

// Inici. app
var app = express();
 
// VIEW ENGINE
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(__dirname + '/public'));

app.use(express.urlencoded({ extended : false}))

// PATH TO VIEW FILE
var pocetna = require('./routes/pocetna');
var stanovi = require('./routes/stanovi');
var kuce = require('./routes/kuce');
var kontakt = require('./routes/kontakt');
var apartmani = require('./routes/apartmani');
var articleRouter = require('./routes/articles');
var auth = require('./routes/auth');
// ROUTS
app.use('/',  pocetna);
app.use('/stanovi', stanovi);
app.use('/kuce', kuce);
app.use('/kontakt', kontakt);
app.use('/apartmani', apartmani);
app.use('/auth', auth);

// SET PUBLIC FOLDER'S
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static("public"));

// FROM MODULES
app.use(express.json());

// Express Session Middleware

// Express Messages middleware
app.use(require('connect-flash')());
app.use(function (req, res, next){
    res.locals.messages = require('express-messages')(req, res);
    next();
});

// Express Messeges middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

// SERVER LISTEN
app.listen(3000, () => {
    console.log("Server listen on port 3000");
});
