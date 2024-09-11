const express = require('express');
const {  getProfile, updateProfile } = require('../controllers/userController');
const protect = require('../middlewares/authMiddleware');
const upload = require('../config/multerConfig'); 

const router = express.Router();


router.get('/profile/:userId', protect, getProfile);
router.put('/profile', protect, upload.single('profilePicture'), updateProfile)

module.exports = router;