const express = require("express");
const { saveBusinessInfo } = require("../controllers/user.controller"); 

const router = express.Router();

router.post("/save", saveBusinessInfo);

module.exports = router;
