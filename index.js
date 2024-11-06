const path = require('path');
// load dependencies
const env = require('dotenv');
const csrf = require('csurf');
const express = require('express');
const flash = require('express-flash');
const bodyParser = require('body-parser');
const expressHbs = require('express-handlebars');
const mysql2 = require('mysql2');

const app = express();
const csrfProtection = csrf();
const router = express.Router();

//Loading Routes
const webRoutes = require('./routes/web');
const sequelize = require('./config/database');
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

sequelize
	.sync()
	.then(() => {
		app.listen(process.env.PORT);
		console.log("App listening on port " + process.env.PORT);
	})
	.catch(err => {
		console.log(err);
	});
