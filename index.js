const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv')
const author = require('./routers/author')
const book = require('./routers/book')

const app = express();
app.use(express.json());
dotenv.config()

const mongoDB = process.env.MONGODB_URI;
const port = process.env.PORT;

(async () => {
    try {
        await mongoose.connect(mongoDB,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    } catch (err) {
        console.log(err)
    }
})()

app.listen(port, function() {
    console.log(`listening on ${port}`)
})

app.use('/author', author)
app.use('/book', book)