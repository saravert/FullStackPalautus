import { useState, useEffect } from 'react'
import axios from 'axios'


const App = () => {

  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() =>{
    console.log('testiä')
    if(countries){
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then(response => {
        setCountries(response.data)
      })
    }
  }, [])

  const handleChange = (event) => {
    setSearch(event.target.value)
    console.log('moikkuu')
  }

  const showFiltered = countries.filter((country) =>
    country.name.common.includes(search)
  )


  return (
    <div>
      <form>
        find countries: <input value={search} onChange={handleChange}/>
      </form>
      <p>Too many matches, specify another filter</p>
      <ul>
        {showFiltered.map(country => (
          <li key={country.cca3}>{country.name.common}</li>
        ))}
      </ul>
    </div>
  )

}

export default App