const createError = require('http-errors');
const express = require('express');
const favicon = require('serve-favicon');
const logger = require('morgan');
const path = require('path');

const app = express();

// Set up logger.
app.use(logger('dev'));

// app.use(favicon(path.join(__dirname, '<PATH TO FAVICON>.ico'))); // TODO Uncomment when you have a favicon.
app.use(express.static(path.join(__dirname, 'dist', 'PracticeWebsite')));

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// Error handler
app.use(function (error, req, res, next) {
    let {statusCode = 500} = error;
    res.status(statusCode).json(error);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
});

module.exports = app;