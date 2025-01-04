const express = require("express");
const signOut = require("../controllers/signOut");
const router = express.Router();

router.post("/", signOut);

module.exports = router;