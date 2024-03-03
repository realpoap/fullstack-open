const Search = ({filter, handleFilterChange}) => {
    return (
        <div>
            <p>Find a country :</p>
            <input value={filter} onChange={handleFilterChange}></input>
        </div>
    )

}

export default Search