const Filter = ({findPerson, handleSearch}) => {
    return(
    <div>filter shown with <input value={findPerson} onChange={handleSearch}></input></div>
    )
  }

  
export default Filter