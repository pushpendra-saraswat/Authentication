const express = require('express');
const { authController } = require('../Controllers');
//const { authenticateJWT } = require('../middleware/authmiddleware');
const router = express.Router();

router.post('/signup',authController.SignUpUser);


router.post('/login' ,authController.LoginUser);
// router.post('/bid' ,authenticateJWT,authController.LoginUser);

module.exports = router;