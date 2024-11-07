
const Knex = require('knex');

const { DATABASE_HOST, DATABASE_NAME, DATABASE_USER, DATABASE_PASSWORD, DATABASE_PORT } = process.env;

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

// Display a simple home message
exports.indexFun = (req, res) => {

	console.log("DB_HOST: ", process.env.DB_HOST);
	console.log("DB_PORT: ", process.env.DB_PORT);
	console.log("DB_DATABASE: ", process.env.DB_DATABASE);
	
	// Test the Knex connection
	knex.raw('SELECT 1+1 AS result')
		.then(() => console.log('Database connected successfully'))
		.catch((err) => console.error('Database connection failed: ', err.message));
};

// Create a new user
exports.createUser = (req, res) => {
    const { name, email, password } = req.body;

    knex('users') // Assuming 'users' is the table name in your DB
        .insert({ name, email, password })
        .returning('*') // This returns the newly inserted user
        .then(user => {
            res.status(201).send({
                message: "User created successfully",
                user: user[0] // The returned value is an array, so we access the first item
            });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error creating user: " + err.message
            });
        });
};

// Retrieve all users
exports.getAllUsers = (req, res) => {
    knex('users') // Assuming 'users' is the table name
        .select('*')
        .then(users => {
            res.status(200).send(users);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving users: " + err.message
            });
        });
};

// Retrieve a single user by ID
exports.getUserById = (req, res) => {
    const userId = req.params.id;

    knex('users') // Assuming 'users' is the table name
        .where({ id: userId })
        .first() // This will return only one record
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "User not found"
                });
            }
            res.status(200).send(user);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving user: " + err.message
            });
        });
};

// Update user data
exports.updateData = (req, res) => {
    try {
        const entryId = req.body.id;
        const editedValue = req.body.editedValue;
        const columnName = req.body.columnName;

        let data = {
            [columnName]: editedValue,
        };

        knex('users') // Assuming 'users' is the table name
            .where({ id: entryId })
            .update(data)
            .then(result => {
                if (result === 0) {
                    return res.status(404).send({
                        message: "User not found"
                    });
                }
                res.status(200).send({
                    message: "User updated successfully"
                });
            })
            .catch(error => {
                res.status(500).send({
                    message: "Error updating user: " + error.message
                });
            });
    } catch (err) {
        res.status(500).send({
            message: "Error in updateData: " + err.message
        });
    }
};

// Delete a user
exports.deleteUser = (req, res) => {
    const userId = req.params.id;

    knex('users') // Assuming 'users' is the table name
        .where({ id: userId })
        .del() // This will delete the user
        .then(result => {
            if (result === 0) {
                return res.status(404).send({
                    message: "User not found"
                });
            }
            res.status(200).send({
                message: "User deleted successfully"
            });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error deleting user: " + err.message
            });
        });
};
