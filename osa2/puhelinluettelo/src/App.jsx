import { useState, useEffect } from 'react'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [findPerson, setFilter] = useState('')
  
  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

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

    personService
    .create(personObject)
    .then(returnedPerson => {
      setPersons(persons.concat(returnedPerson))
      setNewName('')
      setNewPhone('')
    })

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