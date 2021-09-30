const express = require('express')
const router = express.Router() //Express Router is also considered a middleware, just built into Express

// Import the models we need
const Book = require('../models/book')
const Author = require('../models/author')

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
    req.isbn = "12345"
    next()
}

// Let's talk about callbacks here
// Callbacks are just names for functions in js
// would have to use a .then and then wait for the response
// However, some funtions aren't immediate computations or can potentially take a while to return, such as interacting with our database.
// For this reason, we want to use the async/await feature (a new way to implement asynchronous code in js that makes the code cleaner)
// easy error handling using a try and catch block
router.post('/', generateIsbn, async (req, res) => {
    // Example post request to create a book for an author:
    // curl -X POST -H "Content-Type: application/json" -d '{"author": "6153d82453d20de21c62bb68", "title": "ColorStack Dictionary 3", "summary": "This is our books summary", "isbn": "978-3-16-148410-0" }' http://localhost:4200/book/

    try {
        // validate req.body using the model
        // This will throw errors if a required field is not included
        const newBook = new Book(req.body)
        await newBook.save()

        // Push the book to the author that owns it
        const authorId = mongoose.Types.ObjectId(newBook.author)
        const author = await Author.findById(authorId)
        author.books.push(newBook)
        await author.save()

        res.status(200).json(newBook)
    } catch (err) {
        console.log("err", err)
        // res.status(400).json({error: err})
    }
})

router.get('/', async(req, res) => {
    // Example request: http://localhost:4200/book?title=ColorStack%20Dictionary

    try {
        const {title} = req.query
        let book = await Book.find({title}).populate('author')
        res.status(200).json(book)
    } catch (err) {
        res.status(400).json({error: err})
    }
})


// router.delete('/', async(req, res) => {
//     try {
//         // http://localhost:4200/book?id=1234

//         const { id } = req.query

//         const book = await Book.findOneAndDelete({_id: id});

//         res.status(200).json(book)
//     } catch (err) {
//         res.status(400).json({error: err})
//     }
// })

// router.put('/', async(req, res) => {
//     // Example PUT request using cURL:
//     // curl -X PUT -H "Content-Type: application/json" -d '{"id": "1234", "title": "Tristans 2nd book title"}' http://localhost:4200/book/

//     try {
//         // validate req.body
//         const {id, ...body} = req.body
//         const filter = { _id: id };

//         const updatedBook = await Book.findOneAndUpdate(filter, body, {new: true} ) // new: true returns the updated doc
//         res.status(200).json(updatedBook)
//     } catch (err) {
//         res.status(400).json({error: err})
//     }
// })

module.exports = router