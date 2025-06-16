const express = require('express')
const app = express()

let persons = [
  {
    id: '1',
    content: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: '2',
    content: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: '3',
    content: 'Dan Abramov',
    number: '12-43-234345',
  },
    {
    id: '4',
    content: 'Mary Poppendieck',
    number: '39-23-6423122',
  }
]

app.use(express.json())

app.get('/', (request, response) => {
  response.send('Phonebook in the api/persons')
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})