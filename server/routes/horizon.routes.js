const path = require('path');
const express = require('express');
const route = express.Router();

const userRoute = require('./user.routes');
const apiRoute = require('./api.routes');
const JsonHtmlParserRoute = require('./json_html_parser.routes');

const userCtrl = require(path.resolve(__basename, 'controllers', 'user.controllers'));

// const apicache = require('apicache');
// let cache = apicache.options({
//     trackPerformance: true
// }).middleware;

// cache('1 day')

// GLOBAL HEADER CONTROLLER

// route.use((req, res, next) => {
//     res.append('Content-Security-Policy', "img-src self http://pngimg.com/uploads/glasses https://firebasestorage.googleapis.com https://via.placeholder.com");
//     res.append('Content-Security-Policy', "script-src self https://cdn.linearicons.com/free/1.0.0/svgembedder.min.js https://cdnjs.cloudflare.com/ajax/libs/Swiper/4.3.5/js/swiper.min.js https://cdnjs.cloudflare.com/ajax/libs/owl-carousel/1.3.3/owl.carousel.min.js");
//     res.append('Content-Security-Policy', "frame-src https://www.google.com/ https://www.youtube.com/ https://youtube.com/");
//     next();
// });
route.get('/*', function (req, res, next) {
    res.header('Content-Security-Policy', "img-src self http://pngimg.com/uploads/glasses https://firebasestorage.googleapis.com https://via.placeholder.com");
    res.header('Content-Security-Policy', "script-src self https://cdn.linearicons.com/free/1.0.0/svgembedder.min.js https://cdnjs.cloudflare.com/ajax/libs/Swiper/4.3.5/js/swiper.min.js https://cdnjs.cloudflare.com/ajax/libs/owl-carousel/1.3.3/owl.carousel.min.js");
    res.header('Content-Security-Policy', "frame-src https://www.google.com/ https://www.youtube.com/ https://youtube.com/");
    res.header('Content-Security-Policy', "style-src https://fonts.googleapis.com https://www.google.com/ https://www.youtube.com/ https://youtube.com/");
    res.header('Content-Security-Policy', "font-src  https://fonts.gstatic.com");

    // Website you wish to allow to connect
    // res.setHeader('Access-Control-Allow-Origin', 'https://admin.horizon-lenses.com');
    // res.setHeader('Access-Control-Allow-Origin', "*");
    // Request methods you wish to allow
    // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    // res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});

route.get('/robots.txt', (req, res) => res.sendFile(path.resolve(__basename, 'robots.txt')))
route.use('/', userRoute);
route.use('/api', apiRoute);
// route.use('/parser', JsonHtmlParserRoute);

// 404
route.use(userCtrl.get400);
// 404
route.use(userCtrl.get404);
// 500
route.use(userCtrl.get500);

module.exports = route;