const path = require('path');
// load dependencies
const env = require('dotenv');
const csrf = require('csurf');
const express = require('express');
const flash = require('express-flash');
const bodyParser = require('body-parser');
const expressHbs = require('express-handlebars');
const mysql2 = require('mysql2');
const Knex = require('knex');
// require('dotenv').config(); // This loads the variables from .env file into process.env

const app = express();
const csrfProtection = csrf();
const router = express.Router();

//Loading Routes
const webRoutes = require('./routes/web');
// const errorController = require('./app/controllers/ErrorController');

env.config();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

 
app.use(flash());
 
// app.engine(
// 	'hbs',
// 	expressHbs({
// 		layoutsDir: 'views/layouts/',
// 		defaultLayout: 'web_layout',
// 		extname: 'hbs'
// 	})
// );
// app.set('view engine', 'hbs');
// app.set('views', 'views');
app.use(express.json())


app.use(webRoutes);
// app.use(errorController.pageNotFound);


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
		app.listen(process.env.PORT);
 
