const express = require('express');
const cors = require('cors');
const path = require('path'); // Ensure path is required early for serving React build files
const { NotFoundError } = require('./expressError');
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const tdeeRoutes = require('./routes/tdeeLogs');

const app = express();

// Middleware
app.use(express.json());
app.use(
    cors({
        origin: process.env.NODE_ENV === 'production' ? '*' : 'http://localhost:3000', // Adjust CORS for production
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    })
);

// Debugging logs
app.use((req, res, next) => {
    console.log(`${req.method} request to ${req.url}`);
    next();
});

// Routes
app.use('/users', userRoutes);
app.use('/auth', authRoutes);
app.use('/tdee', tdeeRoutes);

// Serve static files from the React frontend build in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/build')));

    // Catch-all route that sends React's index.html
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
    });
}

// Health check route
app.get('/health', (req, res) => {
    res.send('TDEE Tracker API is running');
});

// Handle 404 errors
app.use((req, res, next) => {
    return next(new NotFoundError());
});

// Generic error handler
app.use((err, req, res, next) => {
    if (process.env.NODE_ENV !== 'test') console.error(err.stack);
    const status = err.status || 500;
    const message = err.message;

    return res.status(status).json({
        error: { message, status },
    });
});

module.exports = app;
