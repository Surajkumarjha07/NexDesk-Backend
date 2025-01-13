const express = require('express');
const getWhiteboards = require('../controllers/getWhiteboard');
const router = express.Router();

router.get("/", getWhiteboards);

module.exports = router;