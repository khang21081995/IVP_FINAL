'use strict';
/****************************** Variables ******************************/
// var debug = require('debug')('30shine_Push_Rating:server');
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const logger = require('./utils/logger');

/****************************** app Express config  ******************************/
var app = express();

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});


app.set('view engine', 'ejs');
app.set('views', __dirname + "/views");
app.use('/', express.static(__dirname + "/views"));


app.use(cookieParser("KhangPQ", {maxAge: 60 * 60 * 1000 * 24}));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use(session({
    secret: "KhangPQ",
    name: 'KhangPQ',
    // store: new RedisStore({
    //     host: require("./config.json").REDIS_HOST,
    //     port: require("./config.json").REDIS_PORT,
    //     pass:require("./config.json").MONGO_DATABASE_PASSWORD
    // }),
    cookie: {
        maxAge: 60 * 60 * 1000 * 24//1 day
    },
    // store: new MongoStore({mongooseConnection: mongoose.connection, clear_interval: 3600}),// Store session
    proxy: true,
    resave: true,
    saveUninitialized: true,
}));
// app.use(passport.initialize());
// app.use(passport.session());
require('./routes')(app);
/******************************  CONFIG HTTP SERVER  ******************************/
const port = normalizePort(process.env.PORT || 5000);
app.set('port', port);

var server = http.createServer(app);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    logger.error(error);
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    console.log("listening " + bind)
    // require('./api/schedule/controller').initSchedule();
}
