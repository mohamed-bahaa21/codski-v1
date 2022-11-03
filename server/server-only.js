require('dotenv').config({ path: 'config/.env' })
const path = require('path')
const fs = require('fs');
global.__basename = __dirname;

const compression = require('compression');
const helmet = require('helmet');
const express = require('express');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session');
const csrf = require('csurf')
const cors = require('cors');
const flash = require('connect-flash');

const app = express();

const horizonRoute = require('./routes/horizon.routes');

let mongoose = require('mongoose');
mongoose = undefined;
// const MongoDBStore = require('connect-mongodb-session')(session);

const MONGODB_URI = process.env.MONGODB_URI;
const LOCAL_MONGODB_URI = process.env.LOCAL_MONGODB_URI;
// connect session w/ mongodb
// const store = new MongoDBStore({
//     uri: MONGODB_URI,
//     collection: 'sessions'
// });

const expiryDate = new Date(Date.now() + 60 * 60 * 1000) // 1 hour

var corsWhiteList = ['http://localhost:3000', 'https://admin.horizon-lenses.com', 'https://admin2.horizon-lenses.com'] // allow to server to accept request from different origin
var corsOptions = {
    origin: function (origin, callback) {
        if (corsWhiteList.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // allow session cookie from browser to pass through
}


// Middleware
app.set('view engine', 'ejs');
app.use(
    // Parsers for POST data
    bodyParser.json(),
    bodyParser.urlencoded({ extended: true }),
    express.json({
        limit: '10mb'
    }),
    express.urlencoded({
        extended: true,
        limit: '10mb'
    }),
    express.static(path.join(__dirname, 'public')),
    compression(),
    helmet(),
    // session({
    //     secret: '@010#44$vm=2001ayk2020horizon',
    //     name: 'sessionId',
    //     resave: true,
    //     saveUninitialized: true,
    //     store: store,
    //     path: '/',
    //     httpOnly: false,
    //     secure: true,
    //     domain: 'beta.horizon-lenses.com',
    //     expires: expiryDate
    // }),
    cookieParser("@010#44$vm=2001ayk2020horizon"),
    cors(),
    flash(),
)

const checkMongoose = (req, res, next) => {
    if (!mongoose) {
        res.send("hello server")
    } else {
        next();
    }
}

// routes
app.use('/', checkMongoose, horizonRoute);

// connect database & server
let PORT = 5000;
if (process.env.NODE_ENV == "development") {
    app.listen(PORT);
    console.log(`Server is listening: ${PORT}`);
    console.log(process.env.NODE_ENV);
} else {
    app.listen(PORT);
    // console.log(`Server is listening: ${PORT}`);
    // console.log(process.env.NODE_ENV);
}