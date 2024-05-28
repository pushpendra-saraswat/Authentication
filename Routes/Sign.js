const express = require("express");
const {createuser} = require('../Controllers/Signup')
const router = express.Router();

router.post('/', createuser);

module.exports = router;

