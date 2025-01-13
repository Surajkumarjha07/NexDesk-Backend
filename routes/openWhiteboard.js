const express = require('express');
const openWhiteboard = require('../controllers/openWhiteboard');
const router = express.Router();

router.get("/", openWhiteboard);

module.exports = router;