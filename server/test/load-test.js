const http = require('k6/http');
const { check } = require('k6');
const { textSummary } = require('https://jslib.k6.io/k6-summary/0.0.1/index.js');


// const path = require('k6/');
// const Logger = require(path.resolve(path.join(__dirname, 'services', 'logger.service')));
// const logger = new Logger('beta.horizon-lenses');

function oneReq() {
    const response = http.get(`https://beta.horizon-lenses.com/`);
    check(response, {
        "is status 200": (r) => r.status === 200
    })
}
export default function () {
    const responses = http.batch([
        ['GET', 'https://beta.horizon-lenses.com/'],
        ['GET', 'https://beta.horizon-lenses.com/news'],
        ['GET', 'https://beta.horizon-lenses.com/about'],
        ['GET', 'https://beta.horizon-lenses.com/products/stock_lenses'],
    ]);
    check(responses[0], {
        'home status was 200': (res) => res.status === 200,
    });

    check(responses[1], {
        'news status was 200': (res) => res.status === 200,
    });
}

export let options = {
    vus: 100,
    duration: '10s',
    // iterations: 30000,
    // thresholds: {
    //     'failed requests': ['rate<0.02'],
    //     http_req_duration: ['p(95)<500'],
    //     http_reqs: ['count>6000']
    // },
};

export function handleSummary(data) {
    // console.log('Preparing the end-of-test summary...');

    // Send the results to the LOGS
    // logger.info(`load-test-summary::${Date.now()}`, data)

    // date.now
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    const dateObj = new Date();
    const month = monthNames[dateObj.getMonth()];
    const day = String(dateObj.getDate()).padStart(2, '0');
    const year = dateObj.getFullYear();
    const output = month + ', ' + day + ', ' + year;

    return {
        'stdout': textSummary(data, { indent: ' ', enableColors: true }), // Show the text summary to stdout...
        'test/summary.json': JSON.stringify(data), // and a JSON with all the details...
        'test/last_test.json': JSON.stringify({ "lastTest": output }), // and a JSON with all the details...
        // And any other JS transformation of the data you can think of,
        // you can write your own JS helpers to transform the summary data however you like!
        // './log.log': logger.info(`load-test-summary::${Date.now()}`, data)
    };
}


















