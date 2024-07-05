import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { deleteAnecdote, getAnecdotes, updateAnecdote } from './request'

import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

const App = () => {

  const queryClient = useQueryClient()

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => {
      console.log('updating...')
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      // I spent hours trying to get the query to fire again...
      // queryClient.fetchQueries({ queryKey: ['anecdotes'], queryFn: getAnecdotes })
    }
  })

  const deleteAnecdoteMutation = useMutation({
    mutationFn: deleteAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    }
  })

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
  }

  const handleDelete = (anecdote) => {
    deleteAnecdoteMutation.mutate(anecdote)
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    refetchOnWindowFocus: false,
    staleTime: 0
  })

  if (result.isLoading) {
    return <div>loading data...</div>
  }
  if (result.isError) {
    return <div>Error: {result.error.message}</div>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {[...anecdotes].sort((a, b) => b.votes - a.votes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
            <button onClick={() => handleDelete(anecdote)}>X</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
