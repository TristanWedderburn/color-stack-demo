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

router.post('/', async(req, res) => {
    // Example POST request using cURL:
    // curl -X POST -H "Content-Type: application/json" -d '{"firstName": "tristan", "lastName": "wedderburn"}' http://localhost:4200/author/

    try {
        // validate req.body
        const newAuthor = new Author(req.body)
        await newAuthor.save()
        res.status(200).json(newAuthor)
    } catch (err) {
        res.status(400).json({error: err})
    }

    // try {
    //     await Author.create({firstName: "Bob", lastName: "Jones"})
    // } catch (err) {
    //     console.log(err)
    // }
})

router.get('/', async(req, res) => {
    try {
        // Example query for author with firstName = tristan & lastName=wedderburn:
        // http://localhost:4200/author?firstName=tristan&lastName=wedderburn

        const {firstName, lastName} = req.query

        // Example using child referencing
        const author = await Author.findOne({firstName, lastName}).populate('books'); // to show book details in response, instead of just the id

        // Example using parent referencing
        // let author = await Author.find({firstName, lastName}).populate({path: 'books', select: 'title'})
        // author.name()

        res.status(200).json(author)
    } catch (err) {
        res.status(400).json({error: err})
    }
})

router.delete('/', async(req, res) => {
    try {
        // Example query for author with firstName = tristan & lastName=wedderburn:
        // http://localhost:4200/author?firstName=tristan&lastName=wedderburn

        const {firstName, lastName} = req.query

        // Example using child referencing
        const author = await Author.deleteOne({firstName, lastName});

        res.status(200).json(author)
    } catch (err) {
        res.status(400).json({error: err})
    }
})

router.put('/', async(req, res) => {
    // Example POST request using cURL:
    // curl -X POST -H "Content-Type: application/json" -d '{"firstName": "tristan", "lastName": "wedderburn"}' http://localhost:4200/author/

    try {
        // validate req.body
        const filter = { firstName: req.body.firstName, lastName: req.body.lastName };
        const update = req.body.updatedFields;

        const updatedAuthor = await Author.findOneAndUpdate(filter, update, {new: true} ) // new: true returns the updated doc
        res.status(200).json(updatedAuthor)
    } catch (err) {
        res.status(400).json({error: err})
    }
})

module.exports = router