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

    const personExists = persons.find((person) => person.name.trim().toLowerCase() === personObject.name.toLowerCase())
    
    if(personExists){
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
             personService
             .update(personExists.id, personObject)
             .then((returnedPerson) => {
              setPersons(persons.map((person) => (person.id !== personExists.id ? person : returnedPerson)))
             })
             setNewName('')
             setNewPhone('')
             return
      } else {
        return
      }
    }

    personService
    .create(personObject)
    .then(returnedPerson => {
      setPersons(persons.concat(returnedPerson))
      setNewName('')
      setNewPhone('')
    })

  }

  const deleteContact = id => {
    const person = persons.find(p => p.id === id)
     if (window.confirm(`Delete ${person.name}?`)) 
    {
      personService
      .deleteContact(id)
      .then(() => {
      setPersons(persons.filter((person) => person.id !== id))
                  }
           )
    }
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
      <Persons persons={showFiltered} 
               deletePerson={deleteContact} 
      />
    </div>
  )

}

export default App