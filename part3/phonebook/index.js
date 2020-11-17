const express = require('express')
const app = express()
const morgan = require('morgan')

const cors = require('cors')
app.use(cors())
morgan.token('data', function getBody (req) { return JSON.stringify(req.body) })

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data',{
    skip: function (req, res) { return req.method !== "POST" }}))
app.use(express.static('build'))

require('dotenv').config()
const Person = require('./modules/person')

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})

app.get('/info', (req, res) => {
    let date = new Date(Date.now())
    Person.find().estimatedDocumentCount((err, no_persons) => {
      let message = `Phonebook has info for ${no_persons} people.`
      res.send(`<p>${message}</p> <p> ${date.toString()} </p>`)
    })
})
  
app.get('/api/persons', (req, res, next) => {
    Person.find().then(persons => {
      res.json(persons)
    })
    .catch(error => next(error))
})

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id).then(entry =>
  {
    if (entry) 
    {
      res.json(entry)
    } 
    else 
    {
      res.status(404).end()
    }
  }).catch(error => next(error))
})

app.post('/api/persons', (req, res) => {
    const body = req.body
    
    if (!body || !body.name || !body.number)
    {
        return res.status(400).json(
        { 
            error: 'content missing' 
        })
    }

    const entry = new Person({
        name: body.name,
        number: body.number,
    })

    entry.save().then(savedEntry => {
      res.json(savedEntry)
    })
})

app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body

  const person = {
    name: body.name,
    number: body.number
  }

  Person.findByIdAndUpdate(req.params.id, person, {new: true})
    .then(updatedEntry => {
      console.log("Updated entry is", updatedEntry)
      res.json(updatedEntry)
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then(result => res.status(204).send())
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})