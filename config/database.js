// const dotenv = require('dotenv');
const env = require('dotenv');
const mysql = require('mysql');
const Knex = require('knex');
// const axios = require('axios');
// const { formatInTimeZone } = require('date-fns-tz');
// const { subMinutes } = require('date-fns');
// const chalk = require('chalk');


// dotenv.config();
env.config();

const { DATABASE_HOST, DATABASE_NAME, DATABASE_USER, DATABASE_PASSWORD, DATABASE_PORT } = process.env;

const knex = Knex({
    client: 'mysql',
    connection: {
        host: DATABASE_HOST,
        user: DATABASE_USER,
        port: DATABASE_PORT,
        password: DATABASE_PASSWORD,
        database: DATABASE_NAME
    }
});


// const Sequelize = require('sequelize');
// const env = require('dotenv');
// const mysql = require('mysql');


// const DB_HOST = process.env.DB_HOST

// const DB_PORT = process.env.DB_PORT
// const DB_DATABASE = process.env.DB_DATABASE
// const DB_USERNAME = process.env.DB_USERNAME
// const DB_PASSWORD = process.env.DB_PASSWORD
// const sequelize = new Sequelize(DB_DATABASE, DB_USERNAME, DB_PASSWORD, {
//   dialect: 'mysql',
//   host: DB_HOST
// });

module.exports = knex;
