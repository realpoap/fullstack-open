import { useSelector, useDispatch } from 'react-redux'
import { voteForAnecdote } from '../reducers/anecdoteReducer'
import { changeNotification, removeNotification } from '../reducers/notificationReducer'

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

	const vote = (anecdote) => {
		console.log('anecdote id before call', anecdote.id);
		dispatch(voteForAnecdote(anecdote.id))
		dispatch(changeNotification(`voted for '${anecdote.content}'`))
		setTimeout(() => {
			dispatch(removeNotification())
		}, 3000
		)
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
						<button onClick={() => vote(anecdote)}>vote</button>
					</div>
				</div>
			)}
		</div>
	)
}

export default AnecdoteList