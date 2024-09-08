const express = require('express');
const ProfileController = require('../controllers/profileController');
const { authenticationUser } = require('../middlewares/auth');
const router = express.Router()

router.get('/', authenticationUser,ProfileController.getProfileByUserId);
router.post('/', authenticationUser, ProfileController.addProfile);
router.put('/', authenticationUser, ProfileController.updateProfile);

module.exports = router