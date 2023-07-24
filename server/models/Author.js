const mongoose = require("mongoose");

const AuthorSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Author name is required!"],
        minlength: [3, "Name must be longer than 3 chars"]
    }
}, {timestamps: true});

module.exports = mongoose.model("Author", AuthorSchema);
