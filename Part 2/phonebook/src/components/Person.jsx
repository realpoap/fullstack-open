const Person = ({name, number, handleClick}) => {
    return (
    <>
        <li >{name} : {number}</li>
        <button onClick={handleClick}>Delete</button>
    </>
    )   
}

export default Person