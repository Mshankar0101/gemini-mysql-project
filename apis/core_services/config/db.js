const mysql = require('mysql2');
require('dotenv').config(); 

// Configure the database connection pool using credentials from the .env file
// A connection pool is more efficient than creating a new connection for every query.
// We create it once here and export it for use in other parts of the application.
const dbPool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
}).promise();

// Test the connection
dbPool.getConnection()
    .then(connection => {
        console.log('Successfully connected to the MySQL database.');
        connection.release(); // Release the connection back to the pool
    })
    .catch(err => {
        console.error('Error connecting to the MySQL database:', err);
    });

module.exports = dbPool;
