const express = require('express')
const Author = require("../controllers/author");
const router = express.Router()

// Example of middleware
router.use((req, res, next) => {
    console.log("In the author route")
    console.log(`request type of ${req.method}`)
    next()
})

router.post('/', Author.create)
router.get('/', Author.find)

module.exports = router