# Node Web Application P2E

A P2E for **Node.js** web applications. This P2E gives the basic stucture of application start with while bundling enough useful features so as to remove all those redundant tasks that can derail a project before it even really gets started. This P2E users Express with sequelize as ORM and MySQL as database.

### Prerequisites

1. ```NodeJs```
2. ```NPM```
3. ```MySQL```

### Quick start

3. Install the dependencies with `npm install`
4. Create database in MySQL.
5. Update the your database name and credentials in the `.env` file.
6. Run the application with `npm start` (MySQL service should be up and running).
7. Access `http://localhost:3000` and you're ready to go!

### Folder Structure
```
.
├── app/
│   ├── controllers/           # Controllers
│   ├── middlewares/           # Middlewares
│   ├── models/                # Express database models
├── config/
├── public/                    
│   ├── css/                   # Stylesheets
│   ├── js/                     
│	├── fonts/                 
│   ├── images/
├── .env                       # API keys, passwords, and other sensitive information
├── routes/                    # Route definitions
├── views/                     # All view files
├── index.js                   # Express application
└── package.json               # NPM Dependencies and scripts
```

## Packages used


## Contributing

