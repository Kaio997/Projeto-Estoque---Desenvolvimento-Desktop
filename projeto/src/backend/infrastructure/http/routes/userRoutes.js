const express = require('express');
const userController = require('../controllers/UserController');

const router = express.Router();

router.post('/register', (req, res, next) => userController.register(req, res, next));
router.post('/login', (req, res, next) => userController.login(req, res, next));

module.exports = router;
