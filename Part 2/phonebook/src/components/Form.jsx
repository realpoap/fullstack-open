const Form = ({handleNameChange, handleNumberChange, addPerson, newName, newNumber}) => {
    // Hate that props list
    return (
    <form onSubmit={addPerson}>
        <div>
          name: 
          <input 
            value={newName}
            onChange={handleNameChange}
          />
        </div>
        <div>
          number: 
          <input 
            value={newNumber}
            onChange={handleNumberChange}
          />
        </div>
        <div>
          <button type="submit" >add</button>
        </div>
      </form>
    )
}

export default Form