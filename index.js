require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const Person = require('./models/person')

app.use(cors())
app.use(express.json())
app.use(express.static('build'))

morgan.token('body', function getBody(req) {
  return JSON.stringify(req.body)
})

app.use(morgan('tiny'))
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms :body')
)

app.get('/', (req, res) => {
  res.send('<h1>Sandesh Hyoju</>')
})

app.get('/info', (req, res) => {
  res.send(`
  <div>Phonebook has info for ${persons.length} people </div>
  <p>${new Date()}</>
  `)
})

app.get('/api/persons', (req, res) => {
  Person.find({}).then((persons) => {
    res.json(persons)
  })
})

app.get('/api/persons/:id', (req, res) => {
  Person.findById(req.params.id)
    .then((person) => {
      res.json(person)
    })
    .catch((error) => console.log(error.message))
})

app.delete('/api/persons/:id', (req, res) => {
  Person.findByIdAndDelete(req.params.id)
  const id = Number(req.params.id)
  const person = persons.find((p) => p.id === id)

  if (person) {
    persons = persons.filter((p) => p.id !== id)
    return res.status(204).end()
  }

  res.status(404).end()
})

app.post('/api/persons', (req, res) => {
  const body = req.body

  if (!body.name || !body.number) {
    return res.status(400).json({ error: 'name or number required' })
  }

  const person = new Person({ name: body.name, number: body.number })

  person.save().then((savedPerson) => res.json(savedPerson))
})

const unknownEndPoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndPoint)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
