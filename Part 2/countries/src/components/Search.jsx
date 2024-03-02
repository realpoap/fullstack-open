const Search = ({search, handleChange, handleClick}) => {
    return (
        <div>
            <p>Find a country :</p>
            <input value={search} onChange={handleChange}></input>
        </div>
    )

}

export default Search