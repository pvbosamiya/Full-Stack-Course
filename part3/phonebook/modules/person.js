const mongoose = require('mongoose')

const uniq_validator = require('mongoose-unique-validator')

// eslint-disable-next-line no-undef
const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        minlength: [3, '(`{VALUE}`) should be atleast 3 characters long'],
        uniqueCaseInsensitive: true
    },
    number: {
        type: String,
        required: true,
        minlength: [8, '(`{VALUE}`) Invalid phone number']
    }
})

personSchema.plugin(uniq_validator, { message: 'Error, expected {PATH} to be unique.', type: 'phonebook-unique-validator' })

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)