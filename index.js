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

app.get('/info', (req, res, next) => {
  Person.count()
    .then((count) =>
      res.send(
        `<div>Phonebook has info for ${count} people </div><p>${new Date()}</>`
      )
    )
    .catch((err) => next(err))
})

app.get('/api/persons', (req, res, next) => {
  Person.find({})
    .then((persons) => {
      res.json(persons)
    })
    .catch((err) => next(err))
})

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      person ? res.json(person) : res.status(404).end()
    })
    .catch((err) => next(err))
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then((response) => res.status(204).end())
    .catch((err) => next(err))
})

app.post('/api/persons', (req, res, next) => {
  const body = req.body

  if (!body.name || !body.number) {
    return res.status(400).json({ error: 'name or number required' })
  }

  const person = new Person({ name: body.name, number: body.number })
  person
    .save()
    .then((savedPerson) => res.json(savedPerson))
    .catch((err) => next(err))
})

app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body

  Person.findByIdAndUpdate(
    req.params.id,
    { name: body.name, number: body.number },
    { new: true }
  )
    .then((savedPerson) => res.json(savedPerson))
    .catch((err) => next(err))
})

const unknownEndPoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndPoint)

const errorHandler = (err, req, res, next) => {
  if (err.name === 'CastError') {
    return res.status(400).json({ error: 'malformatted id' })
  }

  next(err)
}
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
