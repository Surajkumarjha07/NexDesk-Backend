const express = require("express");
const saveWhiteboard = require("../controllers/saveWhiteboard");
const router = express.Router();

router.post("/", saveWhiteboard);

module.exports = router;