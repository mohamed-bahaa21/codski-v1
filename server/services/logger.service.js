// const winston = require('winston');
const { createLogger, format, transports } = require('winston')
const { combine, timestamp, printf, colorize, simple } = format
const rTracer = require('cls-rtracer')

const dotenv = require('dotenv');
dotenv.config();
var fs = require('fs');

// checking if log dir exist
var path = require('path');
var logDir = 'logs'; // directory path for logs
if (!fs.existsSync(logDir)) {
    // Create the directory if it does not exist
    fs.mkdirSync(logDir);
}

// setting dateFormat
const dateFormat = () => {
    return new Date(Date.now()).toLocaleString();
}

const rTracerFormat = printf((info) => {
    const rid = rTracer.id()
    return rid
        ? `${info.timestamp} [request-id:${rid}]: ${info.message}`
        : `${info.timestamp}: ${info.message}`
});

const simpleFormat = printf((info) => {
    // let message = `${dateFormat()} | ${info.level.toUpperCase()} | ${info.message}`;
    // let message = `${info.level.toUpperCase()} | ${info.message}`;
    // message = info.obj ? message + `data ${JSON.stringify(info.obj)} | ` : message;

    const rid = rTracer.id()
    let message;
    if (rid && info.obj) {
        message = `[${info.level.toUpperCase()}]::[${info.timestamp}]::[request-id:${rid}]::[msg: ${info.message}]::[data: ${JSON.stringify(info.obj)}]`

    } else {
        if (rid)
            message = `[${info.level.toUpperCase()}]::[${info.timestamp}]::[request-id:${rid}]::[msg: ${info.message}]`

        else if (info.obj)
            message = `[${info.level.toUpperCase()}]::[${info.timestamp}]::[msg: ${info.message}]::[data: ${JSON.stringify(info.obj)}]`

        else
            message = `[${info.level.toUpperCase()}]::[${info.timestamp}]::[msg: ${info.message}]`
    }
    return message;
});

// Logger Service
class LoggerService {
    constructor(route) {
        this.route = route;

        const logger = createLogger({
            level: 'info',
            format: combine(
                timestamp({
                    format: 'MMM-DD-YYYY HH:mm:ss'
                }),
                simpleFormat
            ),
            transports: [
                //   new transports.File({ filename: path.join(logDir, `error.log`), level: 'error' }),
                new transports.File({
                    filename: `${process.env.LOG_FILE_PATH}/${route}.error.log`,
                    level: 'error'
                }),
                new transports.File({
                    filename: `${process.env.LOG_FILE_PATH}/${route}.combined.log`
                }),
                new transports.File({
                    filename: `${process.env.LOG_FILE_PATH}/${route}.load-test.log`,
                    level: 'load-test'
                }),
            ]
        });
        this.logger = logger;

        //
        // If we're not in production then **ALSO** log to the `console`
        // with the colorized simple format .
        //
        if (process.env.NODE_ENV !== 'production') {
            this.logger.add(
                new transports.Console({
                    format: combine(
                        colorize(),
                        // simple()
                    )
                })
            );
        }
    }


    // info log
    async info(message) { this.logger.log('info', message) };
    async info(message, obj) { this.logger.log('info', message, { obj }) };

    // error log
    async error(message) { this.logger.log('error', message) };
    async error(message, obj) { this.logger.log('error', message, { obj }) };

    // load-test log
    async loadTest(message) { this.logger.log('load-test', message) };
    async loadTest(message, obj) { this.logger.log('load-test', message, { obj }) };

    // debug log
    // async debug(message) { this.logger.log('debug', message) };
    // async debug(message, obj) { this.logger.log('debug', message, { obj }) };

}

module.exports = LoggerService;