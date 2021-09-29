const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// child referencing
const AuthorSchema = new Schema(
    {
        firstName: {type: String, required: true, maxLength: 100},
        lastName: {type: String, required: true, maxLength: 100},
        birthDay: {type: Date},
        deathDay: {type: Date},
        books: [
            {
                type: Schema.Types.ObjectId,
                ref: "Book"
            }
        ]
    }
);

// Virtual for author's full name
AuthorSchema
    .virtual('name')
    .get(function () {
        return this.lastName + ', ' + this.firstName;
    });

// Parent referncing, reverse populate the parent documents using virtual
// const AuthorSchema = new Schema(
//     {
//         firstName: {type: String, required: true, maxLength: 100},
//         lastName: {type: String, required: true, maxLength: 100},
//         birthDay: {type: Date},
//         deathDay: {type: Date},
//     }
// );
//
// AuthorSchema.virtual('books', {
//     ref: 'Book', //The Model to use
//     localField: '_id', //Find in Model, where localField
//     foreignField: 'author', // is equal to foreignField
// });
//
// // Set Object and Json property to true. Default is set to false
// // Allows toObject or toJson to be called on virtuals
// AuthorSchema.set('toObject', { virtuals: true });
// AuthorSchema.set('toJSON', { virtuals: true });

//Export model
module.exports = mongoose.model('Author', AuthorSchema);