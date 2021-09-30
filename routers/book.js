const express = require('express')
const router = express.Router() //Express Router is also considered a middleware, just built into Express

// Import the models we need
const Book = require('../controllers/book')

// Add mongoose for ObjectId
const mongoose = require('mongoose');

// Example of middleware
// Other examples could be implementing Authentication and checking if the cookies in our request are valid on the server. We can use third-party libraries to accomplish this!

router.use((req, res, next) => {
    // This method essentially intercepts the request to allow for pre-processing of the request body before passing it to the specified route
    
    // For example, we can intercept and validate the content-type of the request being made for requests to create or update books
    console.log("In the book route")
    console.log(`request type of ${req.method}`)
    next()
})

// const checkContentType = (res, req, next) => {
//     console.log(res)
//     console.log(req)
//     console.log("Content-Type", req.headers['content-type'])

//     if (['POST', 'PUT'].includes(req.method)) {
//         console.log("Potentially dangerous request verb")
//         if (req.headers['content-type'] !== 'application/json') {
//             res.status(400).send('Sorry, the server requires the Content-Type to be application/json ')
//             return
//         }
//         console.log("But, validation passed")
//         next()
//     } 
// }

const generateIsbn = (req, res, next) => {
    console.log("Generating ISBN for book")
    req.body.isbn = "12345"
    next()
}

// Let's talk about callbacks here
// Callbacks are just names for functions in js
// would have to use a .then and then wait for the response
// However, some funtions aren't immediate computations or can potentially take a while to return, such as interacting with our database.
// For this reason, we want to use the async/await feature (a new way to implement asynchronous code in js that makes the code cleaner)
// easy error handling using a try and catch block

// Example post request to create a book for an author:
// curl -X POST -H "Content-Type: application/json" -d '{"author": "6153d82453d20de21c62bb68", "title": "ColorStack Dictionary 3", "summary": "This is our books summary", "isbn": "978-3-16-148410-0" }' http://localhost:4200/book/
router.post('/', generateIsbn, Book.create)

// Example request: http://localhost:4200/book?title=ColorStack%20Dictionary
router.get('/', Book.get)

router.delete('/', Book.remove)

// Example PUT request using cURL:
// curl -X PUT -H "Content-Type: application/json" -d '{"id": "1234", "title": "Tristans 2nd book title"}' http://localhost:4200/book/
router.put('/', Book.update)

module.exports = router