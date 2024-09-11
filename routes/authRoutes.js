const express = require('express');
const { register, login, getProfile, updateProfile } = require('../controllers/authController');
const protect = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);


module.exports = router;
