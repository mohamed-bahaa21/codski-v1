//require the express module
const express = require("express");
const app = express();
const dateTime = require("simple-datetime-formater");
const bodyParser = require("body-parser");
const session = require('express-session');
var cors = require('cors')
const flash = require('connect-flash');
const MongoDBStore = require('connect-mongodb-session')(session);
var unless = require('express-unless');
require('dotenv').config();

const http = require("http").Server(app); //require the http module
// require the socket.io module
const io = require("socket.io")(http, {
  cors: {
    origin: "/",
    methods: ["GET", "POST"],
    allowedHeaders: ["secret-header"],
    credentials: true,
    // allowRequest: (req, callback) => {
    //   const noOriginHeader = req.headers.origin === undefined;
    //   callback(null, noOriginHeader);
    // }
  }
});
// const io = require("socket.io")(http) // require the socket.io module
// socket = io(http); //integrating socketio

// connect session w/ mongodb
const store = new MongoDBStore({
  uri: process.env.MONGODB_URI,
  collection: 'sessions'
});

var sessionMiddleware = session({
  secret: '@010#44$vm=chat',
  name: 'sessionId',
  resave: true,
  saveUninitialized: false,
  store: store,
  path: '/',
  secure: true,
  expires: new Date(Date.now() + 60 * 60 * 1000) // 1 hour
});

var allowlist = ['http://localhost:1234', 'http://localhost:3001', 'https://admin.horizon-lenses.com']

var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (allowlist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}

app.set('view engine', 'ejs');
app.use(bodyParser.json()); //bodyparser middleware
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static(__dirname + "/public")); //set the express.static middleware
app.use(cors(corsOptionsDelegate))
app.use(sessionMiddleware)
app.use(flash());

const appRouter = require("./routes/appRoute");
app.use("/", appRouter); //routes

// convert a connect middleware to a Socket.IO middleware
const wrap = middleware => (io, next) => middleware(io.request, {}, next);

io.use(wrap(sessionMiddleware));

require('./controllers/socketio.controller')(io); // pass the socket.io object to the socketio.controller 

const port = 5001;
http.listen(port, () => {
  console.log("Running on Port: " + port);
});
