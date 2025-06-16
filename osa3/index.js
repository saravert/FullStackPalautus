const express = require('express')
const app = express()

let persons = [
  {
    id: '1',
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: '2',
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: '3',
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
    {
    id: '4',
    name: 'Mary Poppendieck',
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

app.get('/info', (req, response) => {
  const personAmount = persons.length
  const time = new Date ()

  response.send(`
    <div>
      <p>Phonebook has info for ${personAmount} people</p>
      <p>${time}</p>
    </div>
  `)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})