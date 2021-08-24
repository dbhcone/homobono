var createError = require('http-errors');

import config from 'config';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import path from 'path';
import { indexRouter } from './routes/index';
import { authRouter } from './routes/auth';
import { userRouter } from './routes/user';
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', indexRouter);
// #region ================== AUTH ROUTES
app.use('/api/auth', authRouter);
//  #endregion

app.use('/api/user', userRouter)

// serve only the static files from the dist directory
// const statdir = path.join(__dirname, 'dist');
// console.log('static', statdir);
// app.use(express.static(statdir));

// serve only the static files from the dist directory
app.use(express.static(path.join(__dirname, '../public/fe')));

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/fe/'));
});

// Start the app by listening on the default Heroku port
// const port = process.env.PORT || 8080;
// app.listen(port);
// app.on('listening', () => {
//   console.log('App has started on port: ', port);
// });

//#region  ======= CREATE SERVER AND START ===============
var http = require('http');

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
//#endregion

// catch 404 and forward to error handler
app.use(function (req: Request, res: Response, next: NextFunction) {
    next(createError(404));
});

// error handler
app.use((err: { message: any; status: any }, req: Request, res: Response, next: NextFunction) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    // res.status(err.status || 500);
    // res.render('error');
    // res.sendFile(path.join(__dirname, 'fe/index.html'));
    console.log('Error thrown by our error handler');
    // res.sendFile('index.html', { root: '../../dist/fe/' });
    res.status(404).sendFile(path.join(__dirname, '../../dist/fe/index.html'));
});

// DB Connection
try {
    mongoose.connect(
        config.get('CONN_STR_LOC'),
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        },
        (err: mongoose.CallbackError) => {
            if (err) {
                console.log({ error: err.message });
            } else {
                console.log('Database connection successful');
            }
        },
    );
} catch (error) {
    console.log('Error', error);
}

// Some other functions
function onError(error: { syscall: string; code: any }) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

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
    var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    console.log('App started on port: ', bind);
}

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val: string) {
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
module.exports = app;
