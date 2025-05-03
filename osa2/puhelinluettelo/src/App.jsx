import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [findPerson, setFilter] = useState('')

  const addName = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName.trim(),
      number: newPhone.trim()
    }
    if(persons.some((person) => person.name === newName.trim() )){
      alert(`${newName} is already added to phonebook`)
      return
    }
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewPhone('')
  }

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handlePhone = (event) => {
    setNewPhone(event.target.value)
  }

  const handleSearch = (event) => {
    setFilter(event.target.value)
  }

  const showFiltered = persons.filter
      (person => person.name.toLowerCase().includes
        (findPerson.toLowerCase())
      )

  return (
    <div>
      <h2>Phonebook</h2>
      <div>filter shown with <input value={findPerson} onChange={handleSearch}></input></div>
      <h2>Add a new</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNewName}/>
        </div>
        <div>number: <input value={newPhone} onChange={handlePhone}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
      {showFiltered.map(person => 
          <li key={person.name}>{person.name} {person.number}</li>
        )}
      </ul>
    </div>
  )

}

export default App