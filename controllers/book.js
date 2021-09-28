const Author = require('../models/author')
const Book = require('../models/book')

module.exports = {
    create: async(req, res) => {
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

        // try {
        //     await Author.create({firstName: "Bob", lastName: "Jones"})
        // } catch (err) {
        //     console.log(err)
        // }
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