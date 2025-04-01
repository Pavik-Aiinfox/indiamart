const express = require("express");
const { phoneLogin } = require("../controller/user.controller");

const router = express.Router();

router.post("/signIn", phoneLogin);

module.exports = router;
