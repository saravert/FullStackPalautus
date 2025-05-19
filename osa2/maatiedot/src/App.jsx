import { useState, useEffect } from 'react'
import axios from 'axios'


const App = () => {

  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  const [selectedCountry, setSelected] = useState(null)

  useEffect(() =>{
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then(response => {
        setCountries(response.data)
      })
  }, [])
 
  const handleChange = (event) => {
    setSearch(event.target.value)
    setSelected(null)
  }

  const showFiltered = countries.filter((country) =>
    country.name.common.toLowerCase().includes(search.toLowerCase())
  )

  if (showFiltered.length > 10){
      return (     
      <div>
      <form>
        find countries: <input value={search} onChange={handleChange}/>
      </form>
      <p>Too many matches, specify another filter</p>
    </div>
      )
    }

  if (showFiltered.length === 1){
      return (     
      <div>
      <form>
        find countries: <input value={search} onChange={handleChange}/>
      </form>
      <SingleCountry country={showFiltered[0]}/>
    </div>
      )
    }

  return (
    <div>
      <form>
        find countries: <input value={search} onChange={handleChange}/>
      </form>
      <ul>
        {showFiltered.map(country => (
          <li key={country.cca3}>{country.name.common}
              <button onClick={() => setSelected(country)}>Show</button>
          </li>
        ))}
      </ul>
      {selectedCountry && <SingleCountry country={selectedCountry}/>}
    </div>
  )

}

const SingleCountry = ({country}) => {
 const languages = Object.values(country.languages)
  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>Capital: {country.capital}</div>
      <div>Area: {country.area}</div>
      <h2>Languages</h2>
      <ul>
           {languages.map((language, i) => (
            <li key={i}>{language}</li>
           ))}
      </ul>
      <img src={country.flags.png} alt="flag"/>
    </div>
  )
}

export default App