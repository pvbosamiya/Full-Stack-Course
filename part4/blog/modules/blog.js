const mongoose = require('mongoose')
const uniq_validator = require('mongoose-unique-validator')

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 3
    },
    author: {
        type: String,
        required: true,
        minlength: 5,
        unique: true
    },

    url: {
        type: String,
        minlength: 15,
        required: true,
        unique: true
    },
    likes: {
        type: Number
    }
})

blogSchema.plugin(uniq_validator, { message: 'Error, expected {PATH} to be unique.', type: 'blog-unique-validator' })

blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Blog', blogSchema)