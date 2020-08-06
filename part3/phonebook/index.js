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

let persons = [
    {
      "name": "Arto Hellas",
      "number": "040-123456",
      "id": 1
    },
    {
      "name": "Ada Lovelace",
      "number": "39-44-5323523",
      "id": 2
    },
    {
      "name": "Dan Abramov",
      "number": "12-43-234345",
      "id": 3
    },
    {
      "name": "Mary Poppendieck",
      "number": "39-23-6423122",
      "id": 4
    }
]

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})

app.get('/info', (req, res) => {
    let date = new Date(Date.now())
    let message = `Phonebook has info for ${persons.length} people.`
    res.send(`<p>${message}</p> <p> ${date.toString()} </p>`)
})
  
app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const entry = persons.find(person => person.id === id)
    if (entry) 
    {
      res.json(entry)
    } 
    else 
    {
      res.status(404).end()
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)

    res.status(204).end()
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

    existing_entry = persons.filter(person => person.name === body.name)
    if (existing_entry.length !== 0)
    {
        return res.status(400).json(
        {
            error: 'name must be unique' 
        })
    }

    const entry = {
        name: body.name,
        number: body.number,
        id: Math.floor(Math.random() * (100 - persons.length) + persons.length)
    }

    persons = persons.concat(entry)
    res.json(entry)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})