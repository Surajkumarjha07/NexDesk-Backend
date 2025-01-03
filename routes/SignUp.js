const express = require("express");
const signUp = require("../controllers/signUp");
const router = express.Router();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

router.post("/", signUp)

module.exports = router;