const express = require("express");
const userAuthenticated = require("../controllers/authenticated");
const router = express.Router();

router.get("/", userAuthenticated);

module.exports = router;