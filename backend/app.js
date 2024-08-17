// app.js
const express = require('express');
const cors = require('cors');

const { NotFoundError } = require('./expressError');

const userRoutes = require('./routes/users');

app.use('/users', userRoutes);

const app = express();

/** Handle 404 errors -- this matches everything */
app.use(function (req, res, next) {
    return next(new NotFoundError());
});

/** Generic error handler; anything unhandled goes here. */
app.use(function (err, req, res, next) {
    if (process.env.NODE_ENV !== 'test') console.error(err.stack);
    const status = err.status || 500;
    const message = err.message;

    return res.status(status).json({
        error: { message, status },
    });
});

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.get('/', (req, res) => {
    res.send('TDEE Tracker API is running');
});

module.exports = app;
