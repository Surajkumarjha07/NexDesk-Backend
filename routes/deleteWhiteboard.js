const express = require("express");
const deleteWhiteboard = require("../controllers/deleteWhiteboard");
const router = express.Router();

router.delete("/", deleteWhiteboard);

module.exports = router;