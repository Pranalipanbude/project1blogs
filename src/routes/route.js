const express = require('express');
const router = express.Router();


const authorController= require("../controller/authorController.js")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/createAuthor",authorController.createAuthor)




module.exports = router;