import { useSelector, useDispatch } from 'react-redux'
import { voteFor } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {

	const anecdotes = useSelector(state => {
		if (state.filter !== '') {
			return state.anecdotes.filter(note => note.content.toLowerCase().includes(state.filter.toLowerCase()))

		}
		else {
			console.log(state.anecdotes)
			return state.anecdotes
		}
	})

	const dispatch = useDispatch()

	const vote = (id) => {
		dispatch(voteFor(id))
	}

	return (
		<div>

			{[...anecdotes].sort((a, b) => b.votes - a.votes).map(anecdote =>
				<div key={anecdote.id}>
					<div>
						{anecdote.content}
					</div>
					<div>
						has {anecdote.votes}
						<button onClick={() => vote(anecdote.id)}>vote</button>
					</div>
				</div>
			)}
		</div>
	)
}

export default AnecdoteList