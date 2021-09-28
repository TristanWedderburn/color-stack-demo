const Author = require('../models/author')
const Book = require('../models/book')

module.exports = {
    create: async(req, res) => {
        try {
            // validate req.body

            const newAuthor = new Author(req.body)

            try {
                await newAuthor.save()
            } catch (err) {
                console.log(err)
            }
            res.status(200).json(newAuthor)
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
            const {firstName, lastName} = req.query
            let author = await Author.find({firstName, lastName}).populate('books')
            res.status(200).json(author)
        } catch (err) {
            res.status(400).json({error: err})
        }
    }
}