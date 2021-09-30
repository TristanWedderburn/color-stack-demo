const mongoose = require('mongoose');
const Author = require('./author')

const Schema = mongoose.Schema;

const BookSchema = new Schema(
    {
        title: {type: String, required: true},
        author: {type: Schema.Types.ObjectId, ref: 'Author', required: true},
        summary: {type: String, required: true},
        isbn: {type: String, required: true},
    }
);

BookSchema.pre('save', function (next) {
    console.log(this)
    // Don't allow harry potter
    if (this.title === "Harry Potter") {
        throw new Error("Harry Potter is trademarked :(")
    }
    next()
})

BookSchema.post('findOneAndDelete', async function (doc) {
    console.log(doc)
    await Author.updateOne(
        {_id: doc.author},
        {$pull: {books: doc._id}},
    )
})

//Export model
module.exports = mongoose.model('Book', BookSchema);
