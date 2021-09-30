const express = require('express')
const router = express.Router()
const Book = require('../models/book')
const Author = require('../models/author')

// Example of middleware
router.use((req, res, next) => {
    // This method essentially intercepts the request to allow for pre-processing of the request body before passing it to the specified route
    
    // For example, we can intercept and log the request if we want to view all the traffic to our application
    console.log("In the book route")
    console.log(`request type of ${req.method}`)

    // if a certain req method,
    //     if (req.headers['content-type'] !== 'application/json') {
    //         res.status(400).send('Server requires application/json')
    //     } else {
    //     next()
    //     }

    next()
})

const generateIsbn = () => {
    return (req, res, next) => {
        console.log()
        req.isbn = "12345"
        next()
    }
}

router.post('/', () => generateIsbn(), async(req, res) => {
    // Example post request to create a book for an author:
    // curl -X POST -H "Content-Type: application/json" -d '{"author": "6153d82453d20de21c62bb68", "title": "ColorStack Dictionary", "summary": "This is our books summary", "isbn": "978-3-16-148410-0" }' http://localhost:4200/book/

    try {
        // validate req.body
        const newBook = new Book(req.body)
        await newBook.save()

        // Push the book to the author that owns it
        const author = await Author.findById({_id: newBook.author})
        author.books.push(newBook)
        await author.save()

        res.status(200).json(newBook)
    } catch (err) {
        res.status(400).json({error: err})
    }
})

router.get('/', async(req, res) => {
    // request to localhost:4200/book?title=your_title

    try {
        const {title} = req.query
        let book = await Book.find({title}).populate('author')
        res.status(200).json(book)
    } catch (err) {
        res.status(400).json({error: err})
    }
})

router.delete('/', async(req, res) => {
    try {
        // http://localhost:4200/book?id=1234

        const { id } = req.query

        const book = await Book.findOneAndDelete({_id: id});

        res.status(200).json(book)
    } catch (err) {
        res.status(400).json({error: err})
    }
})

router.put('/', async(req, res) => {
    // Example PUT request using cURL:
    // curl -X PUT -H "Content-Type: application/json" -d '{"id": "1234", "birthday": "1/1/2020"}' http://localhost:4200/book/

    try {
        // validate req.body
        const {id, ...body} = req.body
        const filter = { _id: id };

        const updatedBook = await Book.findOneAndUpdate(filter, body, {new: true} ) // new: true returns the updated doc
        res.status(200).json(updatedBook)
    } catch (err) {
        res.status(400).json({error: err})
    }
})

module.exports = router