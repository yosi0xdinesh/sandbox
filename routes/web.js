const express = require('express');
const router = express.Router();
const HomeController = require('../app/controllers/HomeController');


router.post('/changeData', HomeController.updateData);
router.post('/getUsers', HomeController.getAllUsers);
router.get('/', HomeController.indexFun);

module.exports = router;