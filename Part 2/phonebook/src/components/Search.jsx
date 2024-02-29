const Search = ({searchName, handleSearchChange}) => {
    return (

    <div>
        Search: 
        <input
          value={searchName}
          onChange={handleSearchChange}
        />
      </div>
    )
}

export default Search