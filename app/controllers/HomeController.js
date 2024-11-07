const User = require('../models/User');

// Display a simple home message
exports.indexFun = (req, res) => {
    res.type('html');
    res.send('Home');
};

// Create a new user
exports.createUser = (req, res) => {
    const { name, email, password } = req.body;

    User.create({ name, email, password })
        .then(user => {
            res.status(201).send({
                message: "User created successfully",
                user
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
    User.findAll()
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

    User.findByPk(userId)
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

        User.update(data, {
            where: { id: entryId }
        })
            .then(result => {
                if (result[0] === 0) {
                    return res.status(404).send({
                        message: "User not found or no changes made"
                    });
                }
                res.status(200).send({
                    message: "User updated successfully"
                });
            })
            .catch(err => {
                res.status(500).send({
                    message: "Error updating user: " + err.message
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

    User.destroy({
        where: { id: userId }
    })
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
