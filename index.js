const express = require('express')
const app = express()

app.use(express.json())

let data = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const persons = data.find(person => person.id === id)
    if (persons) {
        response.json(persons)
      } else {
        response.status(404).end()
      }
  })

  app.get('/api/persons', (request, response) => {
    response.json(data)
  })

  app.get('/info', (request, response) => {
    const numofentries = Object.keys(data).length;
    const date = new Date();
    const dateUTC = date.toLocaleDateString("en-US");
    response.send(`Phonebook has info for ${numofentries} people. ${dateUTC}`)
  })

  app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = data.filter(person => person.id !== id)
  
    response.status(204).end()
  })
  
  const generateId = () => {
    const maxId = notes.length > 0
      ? Math.max(...notes.map(n => n.id))
      : 0
    return maxId + 1
  }
  
  app.post('/api/persons', (request, response) => {
    const body = request.body
  console.log(body)
    if (!body.content) {
      return response.status(400).json({ 
        error: 'content missing' 
      })
    }
  
    const person = {
        name: body.name,
        number: body.number,
      id: generateId(),
    }
  
    data = data.concat(person)
  
    response.json(person)
  })

  const PORT = 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })