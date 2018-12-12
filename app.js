const createError = require('http-errors');
const express = require('express');
const favicon = require('serve-favicon');
const logger = require('morgan');
const path = require('path');

const app = express();

// Set up view engine and static assets.
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'client/views'));
// app.use(favicon(path.join(__dirname, 'client/static/favicon.ico'))); // TODO Uncomment when you have a favicon.
app.use('/static', express.static(path.join(__dirname, 'client/static')));

// // Set up logger.
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Serve homepage.
app.get('/', (req, res) => {
    res.render('home');
});

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// Error handler
app.use(function (error, req, res, next) {
    console.log("In the error handler");
    let {statusCode = 500, message, expose, stack} = error;
    res.locals.statusCode = statusCode;
    res.locals.message = message;
    if (expose || app.get('env') === 'development') res.locals.stack = stack.split(__dirname).join('app');
    res.status(statusCode).render('error');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
});

module.exports = app;
