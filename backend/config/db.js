'use strict';
const { Client } = require('pg');
require('dotenv').config(); // Ensure dotenv is required here as well

let DB_URI;

// Check if in test environment
if (process.env.NODE_ENV === 'test') {
    DB_URI = process.env.DATABASE_URL_TEST || 'postgresql:///capstone2_test'; // Test database
} else {
    // Default to development DB or use a production DB_URI if in production environment
    DB_URI = process.env.DATABASE_URL || 'postgresql:///capstone2'; // Development database
}

// Create a new PostgreSQL client using the connection string
let db = new Client({
    connectionString: DB_URI,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false // For production with Heroku
});

// Connect to the database
db.connect();

// Export the database client for use in other parts of the app
module.exports = db;
