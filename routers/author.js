const express = require('express')
const Author = require("../controllers/author");
const router = express.Router()

// Example of middleware
router.use((req, res, next) => {
    // This method essentially intercepts the request to allow for pre-processing of the request body before passing it to the specified route
    console.log("In the author route")
    console.log(`request type of ${req.method}`)

    // TODO: add something to the response before passing it into the create method
    next()
})

router.post('/', Author.create)
router.get('/', Author.find)

module.exports = router