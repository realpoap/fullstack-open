import { useDispatch } from "react-redux"
import { addAnecdote } from "../reducers/anecdoteReducer"
import anecdoteService from "../services/anecdoteService"

const AnecdoteForm = () => {
	const dispatch = useDispatch()

	const addNote = async (event) => {
		event.preventDefault()
		const content = event.target.note.value
		event.target.note.value = ''
		const newAnecdote = await anecdoteService.createNew(content)
		dispatch(addAnecdote(newAnecdote))

	}

	return (
		<div>
			<h2>create new</h2>
			<form onSubmit={addNote}>
				<div><input name='note' /></div>
				<button type='submit'>create</button>
			</form>
		</div>

	)
}

export default AnecdoteForm