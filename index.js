const express = require('express');
const mongoose = require('mongoose');
const author = require('./routers/author')
const book = require('./routers/book')

const app = express();
app.use(express.json());

const mongoDB = '';
const port = 8080;

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