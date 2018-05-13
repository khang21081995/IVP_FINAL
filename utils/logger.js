const winston = require('winston');
require('winston-daily-rotate-file');

var transport = new (winston.transports.DailyRotateFile)({
    filename: __dirname+'/../logs/push-notice-',
    datePattern: 'yyyy-MM-dd.log',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d'
});


var logger = new (winston.Logger)({

    transports: [
        transport
    ]
});

// logger.info("khang")
module.exports = logger;