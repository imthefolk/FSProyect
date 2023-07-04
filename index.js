const http = require('http')
require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const Person = require('./models/person')

const errorID = (error, request, response, next) =>{
  if (error.name === 'CastError') {
    response.status(400).send({ error: 'malformatted id' })
  }     
  next(error)
}

app.use(cors())
app.use(express.json())
app.use(express.static('build'))

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

const generateId = () => {
  const maxId = persons.length > 0
    ? Math.max(...persons.map(n => n.id))
    : 0
  return maxId + 1
}

app.post('/api/persons', async (request, response) => {
  const _name = request.body.name;
  const _number = request.body.number;
  
  if (!request.body) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }

  if(!_name) {
    return response.status(400).json({ 
      error: 'name is missing.' 
    })
  }

  else if(!_number) {
    return response.status(400).json({ 
      error: 'number is missing.' 
    })
  } 

  const nombreExiste = await Person.findOne({ name: _name}).exec();

  if (nombreExiste) {
    return response.status(400).json({ 
      error: 'name must be unique.' 
    })

  } else {

    const person = new Person({
      name: _name,
      number: _number
    })

    person.save().then(savedP => {  
      response.send(savedP);
    })
  }
})

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/api/info', async (request, response) => {
  
  const count = await Person.count();
  const datenow = new Date()
  response.write(`Phonebook has info for ${count} people`)
  response.write(`\n${datenow}`)
  response.end()
})


app.get('/api/persons/:id', (request, response, next) => {

  Person.findById(request.params.id).then(person => {
    if (person) {
      response.json(person)
      console.log(person)
    } 

    else {
      return response.status(404).json({ 
        error: 'not found' 
      })
    }
  })
  .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const {content, number} = request.body
  const {id}= request.params

  Person.findByIdAndUpdate(id, { content, number }, { new: true })
    .then(updatedPerson => {
      console.log(updatedPerson)
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      console.log(result)
      response.status(204).end()
    })
    .catch(error => next(error))

})

app.use(errorID)

const PORT = process.env.PORT
app.listen(PORT, () => { 
  console.log(`Server running on port ${PORT}`)
})
