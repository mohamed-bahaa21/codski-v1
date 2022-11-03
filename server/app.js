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
const cors = require('cors');
const flash = require('connect-flash');
// const flash = require('express-flash')

const rTracer = require('cls-rtracer');
const Logger = require('./services/logger.service');
const logger = new Logger('App');

const apicache = require('apicache');

const app = express();
const horizonRoute = require('./routes/horizon.routes');

let LOCAL_STATIC_FILES_DIR = path.join(__dirname, 'public');
let S3_STATIC_FILES_DIR = '';

const mongoose = require('mongoose');
const MongoDBStore = require('connect-mongodb-session')(session);

const MONGODB_URI = process.env.MONGODB_URI;
const LOCAL_MONGODB_URI = process.env.LOCAL_MONGODB_URI;
// connect session w/ mongodb
const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions'
});
const mem_store = new session.MemoryStore;

const expiryDate = new Date(Date.now() + 60 * 60 * 60 * 1000) // 1 hour

// allow to server to accept request from different origin
var corsWhiteList = ['https://horizon-admin.herokuapp.com/', 'https://beta.horizon-lenses.com', 'https://horizon-lenses.com', 'http://localhost:5001', 'http://localhost:3000', 'https://admin.horizon-lenses.com', 'https://admin2.horizon-lenses.com']
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
if (process.env.NODE_ENV == 'development') {
    app.use(express.static(LOCAL_STATIC_FILES_DIR));
}
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
    compression(),
    helmet(),
    cookieParser("@010#44$vm=2001ayk2020horizon"),
    session({
        store: store,
        name: 'sessionId',
        secret: '@010#44$vm=2001ayk2020horizon',
        resave: true,
        saveUninitialized: false,
        path: '/coming-soon',
        secure: true,
        httpOnly: true,
        expires: expiryDate,
        cookie: { maxAge: expiryDate },
    }),
    flash(),
    cors(),
    rTracer.expressMiddleware()
)

// Custom flash middleware -- from Ethan Brown's book, 'Web Development with Node & Express'
app.use(function (req, res, next) {
    // if there's a flash message in the session request, make it available in the response, then delete it
    res.locals.sessionFlash = req.session.sessionFlash;
    delete req.session.sessionFlash;
    next();
});

// routes
app.use((req, res, next) => {
    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    if (res.statusCode == 200 || res.statusCode == 203) {
        logger.info(`GET URL: ${fullUrl}`);
    } else {
        logger.error(`GET URL: ${fullUrl}`);
    }
    next();
})
app.use('/', horizonRoute);

// connect database & server
let PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV == "development") {
    process.env.SERVER_URI = 'http://localhost:5000';
    process.env.SOON_URI = 'http://localhost:5000';
    apicache.clear();
    mongoose
        .connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        })
        .then(result => {
            app.listen(PORT);
            logger.info(`MongoDB & Server is listening: ${PORT}`, { 'process.env.NODE_ENV': process.env.NODE_ENV })
            // console.log(`MongoDB & Server is listening: ${PORT}`);
            // console.log(process.env.NODE_ENV);
        })
        .catch(err => {
            logger.error(err);
            // console.log(err);
        });

} else {
    process.env.SERVER_URI = 'https://beta.horizon-lenses.com';
    process.env.SOON_URI = 'https://horizon-lenses.com';
    apicache.clear()
    mongoose
        .connect(MONGODB_URI, {
            useNewUrlParser: true,
            ssl: true,
            sslValidate: false,
            sslCA: fs.readFileSync(path.resolve(__basename, 'config', 'rds-combined-ca-bundle.pem')),
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        })
        .then(result => {
            app.listen(PORT);
            // console.log(`MongoDB & Server is listening: ${PORT}`);
            // console.log(process.env.NODE_ENV);
        })
        .catch(err => {
            logger.error(err);
            // console.log(err);
        });
}
