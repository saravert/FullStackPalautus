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
    if(persons.some((person) => person.name.toLowerCase() === newName.toLowerCase().trim() )){
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

  const showFiltered = persons.filter((person) => 
    person.name.toLowerCase().includes(findPerson.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter findPerson={findPerson} handleSearch={handleSearch}/>
      <h2>Add a new</h2>
      <PersonForm 
        newName={newName} 
        newPhone={newPhone} 
        onNameChange={handleNewName} 
        onPhoneChange={handlePhone} 
        onSubmit={addName}
      />
      <h2>Numbers</h2>
      <Persons persons={showFiltered} />
    </div>
  )

}

const Filter = ({findPerson, handleSearch}) => {
  return(
  <div>filter shown with <input value={findPerson} onChange={handleSearch}></input></div>
  )
}

const PersonForm = ({newName, newPhone, onNameChange, onPhoneChange, onSubmit}) => {
 return( 
  <form onSubmit={onSubmit}>
        <div>
          name: <input value={newName} onChange={onNameChange}/>
        </div>
        <div>number: <input value={newPhone} onChange={onPhoneChange}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
 )
}

const Persons = ({persons}) => {
  return(
  <ul>
      {persons.map(person => 
          <li key={person.name}>{person.name} {person.number}</li>
        )}
      </ul>
  )
}

export default App