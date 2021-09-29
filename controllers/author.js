const Author = require('../models/author')
const Book = require('../models/book')

module.exports = {
    create: async(req, res) => {
        // Example POST request using cURL:
        // curl -X POST -H "Content-Type: application/json" -d '{"firstName": "tristan", "lastName": "wedderburn"}' http://localhost:4200/author/

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
            // Example query for author with firstName = tristan & lastName=wedderburn:
            // http://localhost:4200/author?firstName=tristan&lastName=wedderburn

            const {firstName, lastName} = req.query
            const author = await Author.find({firstName, lastName}).populate('books'); // to show book details in response, instead of just the id
            res.status(200).json(author)
        } catch (err) {
            res.status(400).json({error: err})
        }
    }
}