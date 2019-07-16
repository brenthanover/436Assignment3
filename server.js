const createError = require('http-errors');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;
const cors = require('cors');

// server variables
var mongoose = require('mongoose');
var indexRouter = require('./routes');
var reviewsRouter = require('./routes/reviews');
var testRouter = require('./routes/test');
var connected = false;

// start up mongo
mongoose.Promise = global.Promise;
var mongodb = 'mongodb+srv://m001-student:m001-mongodb-basics@sandbox-obiso.mongodb.net/assignment_4?retryWrites=true&w=majority';
var db = mongoose.connect( process.env.MONGODB_URI || mongodb, (error) => {
    if (error) {
        console.log("error connecting to mongodb");
        console.log(error);
    } else {
        console.log("successful connection to mongodb");
        connected = true;
    }
});

const server = express();

// confirm connectivity to mongo
server.get('/test_mongo', (req, res) => {
    if (connected) {
        res.send({express: 'YOUR MONGO DATABASE IS CONNECTED TO REACT'});
    }
});

server.use(cors());

server.set('views', path.join(__dirname, 'views'));
server.set('view engine', 'jade');

server.use(express.json());
server.use(bodyParser.urlencoded({extended: false}));
server.use('/static', express.static(path.join(__dirname, 'client/build')));

server.use('/', indexRouter);
server.use('/reviews', reviewsRouter);
server.use('/test', testRouter);

if (process.env.NODE_ENV === 'production') {
    server.use(express.static('client/build'));

    server.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html')); //relative path
    })
}

// console.log that your server is up and running
server.listen(port, () => console.log('Listening on port ' + port));

// catch 404 and forward to error handler
server.use(function(req, res, next) {
    next(createError(404));
});

// error handler
server.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = server;



