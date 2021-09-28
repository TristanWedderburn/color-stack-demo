const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Author = require('./models/author')

const app = express();

const mongoDB = '';
const port = 8080;

try {
    await mongoose.connect(mongoDB);
} catch (err) {
    console.log(err)
}

// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.listen(port, function() {
    console.log(`listening on ${port}`)
})

router.get('/test', (req, res) => {
    res.send("hi")
})

router.get('/books/:author/books/:title', (req, res) => {
    res.send("hi")
})

router.post('/author/:firstName/:lastName', async (req, res) => {
    const newAuthor = new Author({firstName: req.params.firstName, lastName: req.params.lastName})
    try {
        await newAuthor.save()
    } catch (err) {
        console.log(err)
    }
    //
    // try {
    //     await Author.create({firstName: "Bob", lastName: "Jones"})
    // } catch (err) {
    //     console.log(err)
    // }
})