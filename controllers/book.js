const mongoose = require("mongoose");
const Book = require("../models/book");
const Author = require("../models/author");

module.exports = {
    create: async (req, res) => {
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
            res.status(400).json({error: err.toString()})
        }
    },
    get: async (req, res) => {
        try {
            const {title} = req.query
            let book = await Book.find({title}).populate('author')
            res.status(200).json(book)
        } catch (err) {
            res.status(400).json({error: err})
        }
    },
    remove: async (req, res) => {
        try {
            // http://localhost:4200/book?id=1234
            const {id} = req.query
            const book = await Book.findOneAndDelete({_id: id});

            res.status(200).json(book)
        } catch (err) {
            res.status(400).json({error: err})
        }
    },
    update: async (req, res) => {
        try {
            // validate req.body
            const {id, ...body} = req.body
            const filter = { _id: id };

            const updatedBook = await Book.findOneAndUpdate(filter, body, {new: true} ) // new: true returns the updated doc
            res.status(200).json(updatedBook)
        } catch (err) {
            res.status(400).json({error: err})
        }
    }
}