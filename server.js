// Express
let express = require("express");
let app = express();

// Path
let path = require("path");

app.use(express.static(path.join(__dirname, "./client/dist")));
app.use(express.static(path.join(__dirname, "./node_modules")));

// Body Parser
let bodyParser = require("body-parser");
app.use(bodyParser.json());

// Session
let session = require('express-session');
app.use(session({
 secret: 'thysecret',
 resave: false,
 saveUninitialized: false
}));

// Morgan (auto console logs)
let morgan = require("morgan");
app.use(morgan('dev'));

// Mongoose
let mongoose = require('./server/config/mongoose.js');

// Routes
let routes_setter = require('./server/config/routes.js');
routes_setter(app);

// Listening port 8000
let Port = 8000;
app.listen(Port, ()=>
{
	console.log(`Server running at Port: ${Port}`);
});
