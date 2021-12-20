const appRoot = require('app-root-path');
const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({filename: `${appRoot}/logs/error.log`, level: 'error'}),
        new winston.transports.File({filename: `${appRoot}/logs/app.log`}),
    ],
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple(),
    }));
}

module.exports = logger;
