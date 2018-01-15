
// Модель Comment

const mongoose = require('mongoose');

let Comment = mongoose.model('Comment', {
    name: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    comment: {
        type: String,
        required: true,
        minlength: 1,
        trim: true

    }
});

module.exports = {Comment};