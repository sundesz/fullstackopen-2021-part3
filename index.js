const express = require('express')
const morgan = require('morgan')
const app = express()
const PORT = 3001

let persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
]

const generateId = () => Math.floor(Math.random() * 100000)

app.use(express.json())

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
  res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find((p) => p.id === id)

  if (person) {
    return res.json(person)
  }

  res.status(404).end()
})

app.delete('/api/persons/:id', (req, res) => {
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

  if (persons.find((p) => p.name.toLowerCase() === body.name.toLowerCase())) {
    return res.status(400).json({ error: 'name must be unique' })
  }

  const newPerson = { id: generateId(), name: body.name, number: body.number }

  persons = [...persons, newPerson]

  res.status(200).json(newPerson)
})

const unknownEndPoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndPoint)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
