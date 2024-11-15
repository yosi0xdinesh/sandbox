
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

// Display a simple home message
exports.indexFun = (req, res) => {
    res.type('html');
    res.send('Home test');
};

// Create a new user
exports.createUser = (req, res) => {
    const { name, email, status, notes } = req.body;

    knex('apis')  
        .insert({ name, email, status, notes })
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
    knex('apis') 
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

    knex('apis') 
        .where({ id: userId })
        .first() 
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
        // const entryId = req.body.id;
        const provider_id = req.body.provider_id;
        const patient_id = req.body.patient_id;
        const appointment_id = req.body.appointment_id;
        // const editedValue = req.body.editedValue;
        // const columnName = req.body.columnName;
        // var data = {
        //     provider_id: provider_id,
        //     patient_id: patient_id,
        //     appointment_id: appointment_id,
        //     [columnName]: editedValue,  
        // };
        let data = req.body;

        knex('apis') 
            .where({ provider_id: provider_id, patient_id:patient_id, appointment_id:appointment_id  })
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

    knex('apis') 
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
