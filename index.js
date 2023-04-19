const http = require('http')
const express = require('express')
const app = express()
const morgan = require('morgan')

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

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

const generateId = () => {
  const maxId = persons.length > 0
    ? Math.max(...persons.map(n => n.id))
    : 0
  return maxId + 1
}

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }

  const person = {

    id: Math.floor(Math.random() * (Math.floor(250) - Math.ceil(50)) + Math.ceil(50)),
    name: body.name,
    number: body.number
  }

  namefound = persons.find(p => p.name === person.name)

  if(!body.name) {
      return response.status(400).json({ 
        error: 'name is missing.' 
      })
  }

  else if(!body.number) {
    return response.status(400).json({ 
      error: 'number is missing.' 
    })
  } 
  
  else if(namefound) {
    return response.status(400).json({ 
      error: 'name must be unique' 
    })
  }

  else {
    persons = persons.concat(person)
    response.json(person)
  } 

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
    console.log(note)
  } 

  else {
    return response.status(400).json({ 
      error: 'requestid missing' 
    })
  }

})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  console.log(id)

  const requestid = persons.find(person => person.id === id)
  
  if (requestid) { 
    persons = persons.filter(person => person.id !== id)
  }

  response.json(requestid)
  
  response.status(204).end()

})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)