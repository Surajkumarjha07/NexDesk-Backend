const express = require('express');
const updateUser = require('../controllers/update');
const router = express.Router();

router.put("/", updateUser)

module.exports = router;
