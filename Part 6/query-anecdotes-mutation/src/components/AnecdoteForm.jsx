import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createAnecdote } from "../request"

import { useContext } from "react"
import NotifContext from "../NotificationContext"


const AnecdoteForm = () => {

  const queryClient = useQueryClient()
  const [notif, notifDispatch] = useContext(NotifContext)

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (anecdote) => {
      notifDispatch({ type: 'SET', payload: `${anecdote.content} was created` })
      setTimeout(() => {
        notifDispatch({ type: 'RESET' })
      }, 5000)
      queryClient.invalidateQueries(['anecdotes'])
    },
    onError: (err) => {
      notifDispatch({ type: 'SET', payload: `Error: ${err}` }) // Just showing the error message, not a pre-made message
      setTimeout(() => {
        notifDispatch({ type: 'RESET' })
      }, 5000)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log('new anecdote', content)
    newAnecdoteMutation.mutate({ content, votes: 0 })
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
