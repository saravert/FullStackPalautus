import { useState, useEffect } from 'react'
import personService from './services/persons'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/Personform'
import Notification from './components/Notification'


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [findPerson, setFilter] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  
  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {setPersons(initialPersons)})
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
             .then(returnedPerson => {

              setPersons(persons.map((person) => (person.id !== personExists.id ? person : returnedPerson)))
              setNewName('')
              setNewPhone('')

              setSuccessMessage(`Phone number of ${personExists.name} was changed successfully`)
              setTimeout(() => {setSuccessMessage(null)}, 2000)
             })
             .catch(error => {
              if (error.response && error.response.data && error.response.data.error) {
                setErrorMessage(error.response.data.error)
            } else {
             setErrorMessage(`${personExists.name} has been deleted from the server`)
            }
             setTimeout(() => {setErrorMessage(null)}, 3000)
             })
          return
      } else {return}
    }

    personService
    .create(personObject)
    .then(returnedPerson => {
      setPersons(persons.concat(returnedPerson))
      setNewName('')
      setNewPhone('')

      setSuccessMessage(`${personObject.name} was added successfully`)
      setTimeout(() => {setSuccessMessage(null)}, 2000)
    })
    .catch(error => {
      setErrorMessage(error.response.data.error)
       setTimeout(() => {setErrorMessage(null)}, 3000)
      console.log(error.response.data)
    })
  }

  const deleteContact = id => {
    const person = persons.find(p => p.id === id)
     if (window.confirm(`Delete ${person.name}?`)){
      personService
      .deleteContact(id)
      .then(() => {
          setPersons(persons.filter((person) => person.id !== id))
          setSuccessMessage(`${person.name} was deleted successfully`)
          setTimeout(() => {setSuccessMessage(null)}, 2000)
      })
      .catch(error => {
        setErrorMessage(`${person.name} has already been deleted`)
        setTimeout(() => {setErrorMessage(null)}, 3000)
      })
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
       <Notification message={successMessage} type='success' />
       <Notification message={errorMessage} type='error'/>
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