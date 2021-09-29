const Author = require('../models/author')
const Book = require('../models/book')

module.exports = {
    create: async(req, res) => {
        // Example post request to create a book for an author:
        // curl -X POST -H "Content-Type: application/json" -d '{"author": "6153d82453d20de21c62bb68", "title": "ColorStack Dictionary", "summary": "This is our books summary", "isbn": "978-3-16-148410-0" }' http://localhost:4200/book/

        try {
            // validate req.body
            const newBook = new Book(req.body)
            await newBook.save()

            const author = await Author.findById({_id: newBook.author})
            author.books.push(newBook)
            await author.save()

            res.status(200).json(newBook)
        } catch (err) {
            res.status(400).json({error: err})
        }
    },
    find: async(req, res) => {
        try {
            const {title} = req.query
            let book = await Book.find({title}).populate('author')
            res.status(200).json(book)
        } catch (err) {
            res.status(400).json({error: err})
        }
    }
}