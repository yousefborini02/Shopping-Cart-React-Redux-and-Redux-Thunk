const express = require('express');
const router = express.Router();
const getUserController = require('../Controllers/getUserController');
const auth = require('../Middlewares/auth');
router.get('/', auth,getUserController.getUser);

module.exports = router;