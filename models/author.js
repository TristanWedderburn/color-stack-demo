const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// const AuthorSchema = new Schema(
//     {
//         firstName: {type: String, required: true, maxLength: 100},
//         lastName: {type: String, required: true, maxLength: 100},
//         birthDay: {type: Date},
//         deathDay: {type: Date},
//         books: [
//             {
//                 type: Schema.Types.ObjectId,
//                 ref: "Book"
//             }
//         ]
//     }
// );
//
// // Virtual for author's full name
// AuthorSchema
//     .virtual('name')
//     .get(function () {
//         return this.lastName + ', ' + this.firstName;
//     });
//
// // Virtual for author's lifespan
// AuthorSchema.virtual('lifespan').get(function() {
//     let lifetime_string = '';
//     if (this.birthDay) {
//         lifetime_string = DateTime.fromJSDate(this.birthDay).toLocaleString(DateTime.DATE_MED);
//     }
//     lifetime_string += ' - ';
//     if (this.deathDay) {
//         lifetime_string += DateTime.fromJSDate(this.deathDay).toLocaleString(DateTime.DATE_MED)
//     }
//     return lifetime_string;
// });

// Parent referncing, reverse populate the parent documents using virtual
const AuthorSchema = new Schema(
    {
        firstName: {type: String, required: true, maxLength: 100},
        lastName: {type: String, required: true, maxLength: 100},
        birthDay: {type: Date},
        deathDay: {type: Date},
    }
);

AuthorSchema.virtual('books', {
    ref: 'Book', //The Model to use
    localField: '_id', //Find in Model, where localField
    foreignField: 'author', // is equal to foreignField
});

// Set Object and Json property to true. Default is set to false
// Allows toObject or toJson to be called on virtuals
AuthorSchema.set('toObject', { virtuals: true });
AuthorSchema.set('toJSON', { virtuals: true });

//Export model
module.exports = mongoose.model('Author', AuthorSchema);