const express = require('express');
const router = express.Router();
router.use("/", require("./authRoutes"))
router.use("/", require("./playerRoutes"))
// router.use('/',require('./bidRoutes'))
module.exports = router;
