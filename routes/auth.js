const express = require('express');
const router = express.Router();
const { register, login, me } = require('../controller/authController');
const validarToken = require('../middlewares/validarToken');

router.post('/register', register);
router.post('/login', login);
router.get('/me', validarToken, me);

module.exports = router;
