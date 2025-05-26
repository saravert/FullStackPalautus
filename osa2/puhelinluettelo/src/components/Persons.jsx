const Persons = ({persons, deletePerson}) => {
  const label = 'Poista'
    return(
    <ul>
        {persons.map(person => 
            <li key={person.id}>
              {person.name} {person.number}
              <button onClick={() => deletePerson(person.id)}>{label}</button>
            </li>
          )}
        </ul>
    )
  }

  export default Persons