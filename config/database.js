// Import dotenv to handle environment variables
require('dotenv').config(); // This loads the variables from .env file into process.env

const Knex = require('knex');


const { DB_HOST, DB_DATABASE, DB_USERNAME, DB_PASSWORD, DB_PORT } = process.env;

const knex = Knex({
    client: 'mysql',
    connection: {
        host: DB_HOST, // Database host
        user: DB_USERNAME, // Database user
        port: DB_PORT, // Database port
        password: DB_PASSWORD, // Database password
        database: DB_DATABASE // Database name
    }
}); 

// Export knex instance to use in other parts of the app
module.exports = knex;
