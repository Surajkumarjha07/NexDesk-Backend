const express = require('express');
const deleteUser = require('../controllers/delete');
const router = express.Router();

router.delete("/", deleteUser)

module.exports = router;