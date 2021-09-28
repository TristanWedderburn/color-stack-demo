const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AuthorSchema = new Schema(
    {
        firstName: {type: String, required: true, maxLength: 100},
        familyName: {type: String, required: true, maxLength: 100},
        birthDay: {type: Date},
        deathDay: {type: Date},
    }
);

// Virtual for author's full name
AuthorSchema
    .virtual('name')
    .get(function () {
        return this.familyName + ', ' + this.firstName;
    });

// Virtual for author's lifespan
AuthorSchema.virtual('lifespan').get(function() {
    let lifetime_string = '';
    if (this.birthDay) {
        lifetime_string = DateTime.fromJSDate(this.birthDay).toLocaleString(DateTime.DATE_MED);
    }
    lifetime_string += ' - ';
    if (this.deathDay) {
        lifetime_string += DateTime.fromJSDate(this.deathDay).toLocaleString(DateTime.DATE_MED)
    }
    return lifetime_string;
});

// Virtual for author's URL
AuthorSchema
    .virtual('url')
    .get(function () {
        return '/catalog/author/' + this._id;
    });

//Export model
module.exports = mongoose.model('Author', AuthorSchema);