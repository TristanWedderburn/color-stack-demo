const Author = require("../models/author");

module.exports = {
    create: async(req, res) => {
        try {
            // validate req.body
            const newAuthor = new Author(req.body)
            await newAuthor.save()
            res.status(200).json(newAuthor)
        } catch (err) {
            res.status(400).json({error: err})
        }

        // This is an alternative to doing .save()
        // try {
        //     await Author.create({firstName: "Bob", lastName: "Jones"})
        // } catch (err) {
        //     console.log(err)
        // }
    },
    get: async (req, res) => {
        try {
            const {firstName, lastName} = req.query

            // Example using child referencing
            const author = await Author.findOne({firstName, lastName}).populate('books'); // to show book details in response, instead of just the id

            // Example using parent referencing
            // Probably dont need to cover in this
            // let author = await Author.find({firstName, lastName}).populate({path: 'books', select: 'title'})

            //Example of using the author virtual!
            console.log(author.name)
            res.status(200).json(author)
        } catch (err) {
            res.status(400).json({error: err})
        }
    },
    remove: async (req, res) => {
        try {
            const { id } = req.query
            await Author.deleteOne({id});

            res.status(200)
        } catch (err) {
            res.status(400).json({error: err})
        }
    },
    update: async (req, res) => {
        try {
            // validate req.body
            const {id, ...body} = req.body
            const filter = { _id: id };

            const updatedAuthor = await Author.findOneAndUpdate(filter, body, {new: true} ) // new: true returns the updated doc
            res.status(200).json(updatedAuthor)
        } catch (err) {
            res.status(400).json({error: err})
        }
    }
}