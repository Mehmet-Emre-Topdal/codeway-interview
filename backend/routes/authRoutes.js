const express = require('express');
const router = express.Router();


const { logout, signIn } = require('../controllers/authController');


router.post('/logout' ,logout);

router.post('/signIn', signIn);

module.exports = router;