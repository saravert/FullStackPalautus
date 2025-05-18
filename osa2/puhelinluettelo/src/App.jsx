import { useState, useEffect } from 'react'
import personService from './services/persons'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/Personform'

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

export default App