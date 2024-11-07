const express = require('express');
const router = express.Router();
const HomeController = require('../app/controllers/HomeController');
 

router.put('/changeData', HomeController.updateData);
router.get('/getUsers', HomeController.getAllUsers);
router.post('/addUser', HomeController.createUser);
router.get('/', HomeController.indexFun);

module.exports = router;