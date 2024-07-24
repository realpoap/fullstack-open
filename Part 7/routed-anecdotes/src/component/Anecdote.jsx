import { useParams } from "react-router-dom"


const Anecdote = ({ anecdotes }) => {
	const id = useParams().id
	const anecdote = anecdotes.find(a => a.id === Number(id))
	return (
		<div>
			<h2>{anecdote.content}</h2>
			<p>Author: {anecdote.author}</p>
			<p>Votes: {anecdote.votes}</p>
			<p><a href={anecdote.info}>More info</a></p>
		</div>

	)

}

export default Anecdote
