const Message = ({message, messageType}) => {
    if (message === null) {
        return null
    }
    
    return (
        <div className={messageType}>
            {message}
        </div>
    )
}

export default Message