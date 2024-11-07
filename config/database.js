// Import dotenv to handle environment variables
require('dotenv').config(); // This loads the variables from .env file into process.env

const Knex = require('knex');

// Destructure environment variables from process.env
const { DATABASE_HOST, DATABASE_NAME, DATABASE_USER, DATABASE_PASSWORD, DATABASE_PORT } = process.env;

// Create and configure Knex instance with MySQL client
const knex = Knex({
    client: 'mysql',
    connection: {
        host: DATABASE_HOST, // Database host
        user: DATABASE_USER, // Database user
        port: DATABASE_PORT, // Database port
        password: DATABASE_PASSWORD, // Database password
        database: DATABASE_NAME // Database name
    }
});

// Export knex instance to use in other parts of the app
module.exports = knex;
