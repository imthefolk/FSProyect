const http = require('http')
const express = require('express')
const app = express()

app.use(express.json())

let persons = [
  {
    id: 1,
    name: "Arturo HEllas",
    number: "040-123456",
  
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "041-123456",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "042-123456",
  },
  {
    id: 4,
    name: "Mary Poppen",
    number: "043-123456",
  }

]

const generateId = () => {
  const maxId = persons.length > 0
    ? Math.max(...persons.map(n => n.id))
    : 0
  return maxId + 1
}

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.content) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }

  const note = {
    content: body.content,
    important: body.important || false,
    date: new Date(),
    id: generateId(),
  }

  persons = persons.concat(note)

  response.json(note)
})

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/info', (request, response) => {
  const sumppl = [...persons.map(n => n.id)].length
  const datenow = new Date()
  response.write(`Phonebook has info for ${sumppl} people`)
  response.write(`\n${datenow}`)
  response.end()
})


app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  console.log(id)
  const note = persons.find(note => note.id === id)

  if (note) {
    response.json(note)
  } else {
    response.status(204).end()
  }

  console.log(note)
  response.json(note)
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)